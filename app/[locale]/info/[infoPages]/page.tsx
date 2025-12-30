import styles from './page.module.css';
import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '@/app/i18n'
import { getFilteredData } from "@/HelperFunctions/filterAbouData";
import { getContentID } from '@/HelperFunctions/getContentId';
import { newInfofilteredPdfs } from '@/HelperFunctions/filterSafetyPDF';
import NewPDFComponent from '@/components/newPDF/newpdfComponent';

export default async function InfoPages(
    { searchParams, params: { locale, infoPages }}: 
    { searchParams:  { [key: string]: string | string[] | undefined },
      params: { locale: string, infoPages: string }}
) {
  // get content id
  const contentId = await getContentID('/Info', `/${infoPages}`);

  // apiData based on title
  const infoPageData = await getFilteredData(contentId, locale);

  // get pdfs 
  const pdfs = await newInfofilteredPdfs(infoPages, locale);

  // For Translation
  const { t, resources } = await initTranslations(locale, ['dictionary']);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <div className={styles.safetyContent}>
        {infoPageData.length > 0 && (
          <div
            dangerouslySetInnerHTML={{
              __html: infoPageData[0].content
            }}
          />
        )}
        {pdfs.length > 0 && pdfs.map((pdf_item) => (
          <NewPDFComponent 
            key={pdf_item.rec_id} 
            text={pdf_item.text}
            title={pdf_item.title} 
            href={pdf_item.pdf} />
        ))}
      </div>
    </TranslationsProvider>
  );
}