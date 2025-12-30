import NewsDetails from '@/components/NewsDetails/NewsDetails';
import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '../../../i18n';
import innerNews from '@/app/api/innerNews';
import InnerNewsProps from '@/Interfaces/InnerNewsProps';
import { notFound } from 'next/navigation';

export default async function InnerNewsPage (
  { params: { locale, newsId }}: 
  { params: { locale: string, newsId: string }}) {
  if (parseInt(newsId) <= 0) {
    notFound();
  }
  // get inner news data from api call and filter it based on language
  let newsDetails: InnerNewsProps[] = [];

  try {
    const apiData: InnerNewsProps[] = await innerNews(newsId);
    if (locale === 'ge') {
      newsDetails = apiData.filter((item) => item.lang === 'geo');
    } else if (locale === 'en') {
      newsDetails = apiData.filter((item) => item.lang === 'eng');
    }

    if (!newsDetails.length) {
      notFound();
    }
  } catch(error) {
    console.error('Error fetching news details:', error);
  }
  
  // for translation
  const { t, resources } = await initTranslations(locale, ['dictionary']);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <p>{t('news')}</p>
      <NewsDetails 
        rec_id={newsDetails[0].rec_id}
        gallery={newsDetails[0].gallery}
        date={newsDetails[0].date}
        title={newsDetails[0].title}
        text={newsDetails[0].text}
        video={newsDetails[0].video}  
        img={newsDetails[0].img} 
        similar_news={newsDetails[0].similar_news}         
      />
    </TranslationsProvider>
  )
}