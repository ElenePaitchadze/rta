import TranslationsProvider from '@/components/TranslationsProvider';
import styles from './page.module.css';
import initTranslations from '@/app/i18n';
import { getContentID } from '@/HelperFunctions/getContentId';
import { transferchildPdfs } from '@/HelperFunctions/filterSafetyPDF';
import { getFilteredData } from '@/HelperFunctions/filterAbouData';
import NewPDFComponent from '@/components/newPDF/newpdfComponent';

export default async function TransferPageChildren({
  searchParams, params: { locale, transferPages, transferPageChildren }
}: {
  searchParams: { [key: string]: string | string[] | undefined },
  params: { locale: string, transferPages: string; transferPageChildren: string }
}) {

  const contentId = await getContentID('/Transfer', `/${transferPages}`, `/${transferPageChildren}`);
  const transferPageChildrenData = await getFilteredData(contentId, locale);

  // get pdfs 
  const pdfs = await transferchildPdfs(transferPages, transferPageChildren, locale);

  // For Translation
  const { t, resources } = await initTranslations(locale, ['dictionary']);
  
  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <div className={styles.safetyContent}>
        {transferPageChildrenData.length > 0 && (
          <div
            dangerouslySetInnerHTML={{
              __html: transferPageChildrenData[0].content
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
