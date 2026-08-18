import TranslationsProvider from '@/components/TranslationsProvider';
import styles from './page.module.css';
import initTranslations from '@/app/i18n';
import { getContentID } from '@/HelperFunctions/getContentId';
import { childPdfs } from '@/HelperFunctions/filterSafetyPDF';
import { getFilteredData } from '@/HelperFunctions/filterAbouData';
import NewPDFComponent from '@/components/newPDF/newpdfComponent';
import EducationAccordeion from '@/components/Education/Education';
import { getEducation } from '@/HelperFunctions/getHospitals';

export default async function RecognizedMedicalInst({
  searchParams, params: { locale, safetyPages }
}: {
  searchParams: { [key: string]: string | string[] | undefined },
  params: { locale: string, safetyPages: string; }
}) {

  const safetyPageChildren = 'person-providing-specialist-training';
  const contentId = await getContentID('/Safety', `/${safetyPages}`, `/${safetyPageChildren}`);
  const safetyPageChildrenData = await getFilteredData(contentId, locale);

  // get pdfs 
  const pdfs = await childPdfs(safetyPages, safetyPageChildren, locale);

  const education = await getEducation();

  // For Translation
  const { t, resources } = await initTranslations(locale, ['dictionary']);
  
  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <div className={styles.safetyContent}>
        {safetyPageChildrenData.length > 0 && (
          <div
            dangerouslySetInnerHTML={{
              __html: safetyPageChildrenData[0].content
            }}
          />
        )}
        <EducationAccordeion education={education} />
        {pdfs.length > 0 && pdfs.map((pdf_item) => (
          <NewPDFComponent 
            key={pdf_item.rec_id} 
            title={pdf_item.title} 
            text={pdf_item.text}
            href={pdf_item.pdf} />
        ))}
      </div>
    </TranslationsProvider>
  );
}
