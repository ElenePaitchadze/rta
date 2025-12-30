
import InfoCard from '@/components/InfoCard/InfoCard';
import styles from "./page.module.css";
import PaginationControls from "@/components/Pagination/PaginationControls";
import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '../../i18n';
import mainNews from '@/app/api/mainNews';
import NewsProps from "@/Interfaces/NewsProps";
import DateRangeSelect from "@/components/DateRangeSelect/DateRangeSelect";

// Combined mapping for both English and Georgian month abbreviations
const monthMap: { [key: string]: number } = {
  'Jan': 0, 'იან': 0,  
  'Feb': 1, 'თებ': 1, 
  'Mar': 2, 'მარ': 2,
  'Apr': 3, 'აპრ': 3,
  'May': 4, 'მაი': 4,
  'Jun': 5, 'ივნ': 5,
  'Jul': 6, 'ივლ': 6,
  'Aug': 7, 'აგვ': 7,
  'Sep': 8, 'სექ': 8,
  'Oct': 9, 'ოქტ': 9,
  'Nov': 10, 'ნოე': 10,
  'Dec': 11, 'დეკ': 11
};

export default async function NewsPage(
  { searchParams, params: { locale }}: 
  { searchParams:  { startDate?: string; endDate?: string; [key: string]: string | string[] | undefined },
    params: { locale: string }}
) {
  // get news data from api call and filter it based on language
  let newsData: NewsProps[] = [];
  try {
    const apiData = await mainNews();
    if (apiData === null) {
      throw new Error('Error during fetching News');
    }
    if (locale === 'ge') {
      newsData = apiData.filter((item: NewsProps) => item.lang === 'geo');
    } else if (locale === 'en') {
      newsData = apiData.filter((item: NewsProps) => item.lang === 'eng');
    }
  } catch (error) {
    console.error('Error fetching filtered PDF information:', error);
  }

  // Filter data based on date range that user chose 
  const filteredNews = newsData.filter((item) => {
    const dateArr = item.date.split(',');
    const [day, month] = dateArr[0].trim().split(' ');
    const year = dateArr[1].trim();

    const monthNum = monthMap[month];
    const newsDate = new Date(Date.UTC(parseInt(year), monthNum, parseInt(day), 23, 59, 59, 999)); 

    const startDate = searchParams.startDate 
      ? new Date(Date.UTC(
          new Date(searchParams.startDate).getUTCFullYear(),
          new Date(searchParams.startDate).getUTCMonth(),
          new Date(searchParams.startDate).getUTCDate(),
          0, 0, 0, 0)) 
      : new Date(0);
    const endDate = searchParams.endDate 
      ? new Date(Date.UTC(
          new Date(searchParams.endDate).getUTCFullYear(),
          new Date(searchParams.endDate).getUTCMonth(),
          new Date(searchParams.endDate).getUTCDate(),
          23, 59, 59, 999)) 
      : new Date(Date.UTC(
          new Date().getUTCFullYear(),
          new Date().getUTCMonth(),
          new Date().getUTCDate(),
          23, 59, 59, 999));

      // console.log(endDate);

    return newsDate >= startDate && newsDate <= endDate;
  });


  // for pagination
  const page = searchParams['page'] ?? '1';
  const perPage = 9;
  const totalPages = Math.ceil(filteredNews.length / perPage);
  const currentPage = Math.min(Number(page), totalPages); 
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const entries = filteredNews.slice(start, end);
  
  // for translation
  const { t, resources } = await initTranslations(locale, ['dictionary']);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <div className={styles.newsHeading}>
        <p>{t('news')}</p>
        <DateRangeSelect />
      </div>
      <div className={styles.newsContainer}>
        {filteredNews.length > 0 ? (
          <>
            <div className={styles.newsGrid}>
              {entries.map((item: NewsProps) => (
                <InfoCard
                  key={item.rec_id}
                  rec_id={item.rec_id}
                  img={item.img}
                  date={item.date}
                  title={item.title}
                  intro={item.intro}
                />
              ))}
            </div>
            <PaginationControls
              length={filteredNews.length}
              hasNextPage={end < filteredNews.length}
              hasPrevPage={start > 0}
              destination="news"
              perPage={perPage}
            />
          </>
        ) : (
          <p className={styles.noNewsFound}>{t('noNewsFound')}</p>
        )}
      </div>
    </TranslationsProvider>
  );
}