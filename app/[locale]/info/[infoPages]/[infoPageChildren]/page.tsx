import TranslationsProvider from '@/components/TranslationsProvider';
import styles from './page.module.css';
import initTranslations from '@/app/i18n';
import { getContentID } from '@/HelperFunctions/getContentId';
import { infochildPdfs } from '@/HelperFunctions/filterSafetyPDF';
import { getFilteredData } from '@/HelperFunctions/filterAbouData';
import NewPDFComponent from '@/components/newPDF/newpdfComponent';

export default async function InfoPageChildren({
  searchParams, params: { locale, infoPages, infoPageChildren }
}: {
  searchParams: { [key: string]: string | string[] | undefined },
  params: { locale: string, infoPages: string; infoPageChildren: string }
}) {

  const contentId = await getContentID('/Info', `/${infoPages}`, `/${infoPageChildren}`);
  const infoPagesChildrenData = await getFilteredData(contentId, locale);

  // get pdfs 
  const pdfs = await infochildPdfs(infoPages, infoPageChildren, locale);

  // For Translation
  const { t, resources } = await initTranslations(locale, ['dictionary']);
  
  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <div className={styles.safetyContent}>
        {infoPagesChildrenData.length > 0 && (
          <div
            dangerouslySetInnerHTML={{
              __html: infoPagesChildrenData[0].content
            }}
          />
        )}
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
