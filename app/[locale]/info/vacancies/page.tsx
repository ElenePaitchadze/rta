import styles from './page.module.css';
import Vacancy from "@/components/Vacancy/Vacancy";
import PaginationControls from "@/components/Pagination/PaginationControls";
import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '@/app/i18n';
import vacancies from '@/app/api/vacancies';
import VacancyProps from '@/Interfaces/VacancyProps';

export default async function VacanciesPage(
  { searchParams, params: { locale }}: 
  { searchParams:  { [key: string]: string | string[] | undefined }, params: { locale: string }}) {

  // get vacancies data from api
  const apiData: VacancyProps[] = await vacancies();
  // filter it by language
  let vacanciesData: VacancyProps[] = [];
  if (locale === 'ge') {
    vacanciesData = apiData.filter((item: VacancyProps) => item.lang === 'geo');
  } else if (locale === 'en') {
    vacanciesData = apiData.filter((item: VacancyProps) => item.lang === 'eng');
  }

  // for Pagination
  const page = searchParams['page'] ?? '1';
  const perPage = 7;
  const totalPages = Math.ceil(vacanciesData.length / perPage);
  const currentPage = Math.min(Number(page), totalPages); 
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const entries = vacanciesData.slice(start, end);
  // for translation 
  const { t, resources } = await initTranslations(locale, ['dictionary']);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <div>
        <div className={styles.vacancies}>
          {
            entries.map((vacancy, index) => (
              <Vacancy 
                key={index}
                title={vacancy.title} 
                description={vacancy.text} />
            ))
          }
        </div>
        <PaginationControls
          length={vacanciesData.length}
          hasNextPage={end < vacanciesData.length}
          hasPrevPage={start > 0}
          destination='vacancies'
          perPage={perPage}
        />
      </div>
    </TranslationsProvider>
);
}