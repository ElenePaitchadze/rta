import styles from "./page.module.css";
import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '../../i18n';
import Link from "next/link";
import arrow from "@/img/arrowright.png";
import Image from "next/image";
import mainNews from "@/app/api/mainNews";
import NewsProps from "@/Interfaces/NewsProps";

export default async function Search(
  { searchParams: { query }, params: {locale}}: 
  { searchParams: {query: string}, params: {locale: string}}) {
  const { t, resources } = await initTranslations(locale, ['dictionary']);
  const apiData: NewsProps[] = await mainNews();
  let newsItems: NewsProps[] = [];

  // filter news based on language
  if (locale === 'ge') {
    newsItems = apiData.filter((item) => item.lang === 'geo');
  } else if (locale === 'en') {
    newsItems = apiData.filter((item) => item.lang === 'eng');
  }

  // Filter the news items based on the query
  const filteredNewsItems = newsItems.filter(newsItem =>
    newsItem.title && newsItem.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <div className={styles.searchContainer}>
        <div className={styles.searchContent}>
          <h2 className={styles.searchHeading} >{t('searchResults')}: <span>{filteredNewsItems.length}</span></h2>
          <div className={styles.results}>
            {filteredNewsItems.map(newsItem => (
              <div key={newsItem.rec_id} className={styles.result}>
                <img  
                  src={`http://admin.rta.gov.ge/${newsItem.img}`} 
                  alt='news image' />
                <div className={styles.details}>
                  <p className={styles.title}>{newsItem.title}</p>
                  <div
                    className={styles.text}
                    dangerouslySetInnerHTML={{
                      __html: newsItem.text
                    }}
                  />
                  <Link href={`/news/${newsItem.rec_id}`} className={styles.seeMore}>
                    <span>{t('detail')}</span>
                    <Image src={arrow} alt="right arrow" priority={true}></Image>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TranslationsProvider>
  )
}