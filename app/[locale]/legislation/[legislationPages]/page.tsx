import TranslationsProvider from '@/components/TranslationsProvider';
import PdfComponent from "@/components/PDF/PdfComponent";
import PaginationControls from '@/components/Pagination/PaginationControls';
import initTranslations from '@/app/i18n';
import LegislationProps from '@/Interfaces/LegislationProps';
import { filterlegislationPdfs } from '@/HelperFunctions/filterleginaltionPdfs';

export default async function legislationPages(
  { searchParams, params: { locale, legislationPages }}: 
  { searchParams:  { [key: string]: string | string[] | undefined },
    params: { locale: string, legislationPages: string }}
) {

  // get api data and filter it via cat_id and language 
  const legalActsData = await filterlegislationPdfs(`/${legislationPages}`, locale);

  // for Pagination
  const page = searchParams['page'] ?? '1';
  const perPage = 8;
  const totalPages = Math.ceil(legalActsData.length / perPage);
  const currentPage = Math.min(Number(page), totalPages); 
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const entries = legalActsData.slice(start, end);
  // for translation 
  const { t, resources } = await initTranslations(locale, ['dictionary']);

    return (
      <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
        <div>
          {legalActsData.length > 0 ? (
            <>
              <div>
                {
                  entries.map((pdf: LegislationProps) => (
                    <PdfComponent key={pdf.rec_id} title={pdf.pdf_title} href={pdf.pdf} />
                  ))
                }
              </div>
              <PaginationControls
                length={legalActsData.length}
                hasNextPage={end < legalActsData.length}
                hasPrevPage={start > 0}
                destination={`/legislation/${legislationPages}`}
                perPage={perPage}
              />
            </>
          ) : (
            <p className='nodataavalable'></p>
          )}
        </div>
      </TranslationsProvider>
    )
}