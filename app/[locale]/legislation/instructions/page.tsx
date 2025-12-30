import TranslationsProvider from '@/components/TranslationsProvider';
import PdfComponent from "@/components/PDF/PdfComponent";
import PaginationControls from '@/components/Pagination/PaginationControls';
import initTranslations from '../../../i18n';
import LegislationProps from '@/Interfaces/LegislationProps';
import { getFilteredLegislationData } from '@/HelperFunctions/filterLegislationData';

export default async function InstructionsPage(
  { searchParams, params: { locale }}: 
  { searchParams:  { [key: string]: string | string[] | undefined },
    params: { locale: string }}
) {
  // get api data and filter it via cat_id and language 
  const instructionsData = await getFilteredLegislationData('94', locale);

  // for Pagination
  const page = searchParams['page'] ?? '1';
  const perPage = 8;
  const totalPages = Math.ceil(instructionsData.length / perPage);
  const currentPage = Math.min(Number(page), totalPages); 
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const entries = instructionsData.slice(start, end);
  // for translation 
  const { t, resources } = await initTranslations(locale, ['dictionary']);

    return (
      <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
        {
          instructionsData.length > 0 ? (
            <div>
              <div>
                {
                  entries.map((pdf: LegislationProps) => (
                    <PdfComponent key={pdf.rec_id} title={pdf.pdf_title} href={pdf.pdf} />
                  ))
                }
              </div>
              <PaginationControls
                length={instructionsData.length}
                hasNextPage={end < instructionsData.length}
                hasPrevPage={start > 0}
                destination='/legislation/instructions'
                perPage={perPage}
              />
          </div>
          ) : (
            <p className='nodataavalable'></p> // You can customize this message as needed
          )
        }
      </TranslationsProvider>
    )
}