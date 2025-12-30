import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '../i18n';
import BannerSwiper from "@/components/BannerSwiper/BannerSwiper";
import InfoSwiper from "@/components/InfoSwiper/InfoSwiper";
import SafetyPreview from "@/components/SafetyPreview/SafetyPreview";
import TransferPreview from "@/components/TransferPreview/TransferPreview";
import Subscribe from '@/components/Subscribe/Subscribe';
import mainNews from '../api/mainNews';
import NewsProps from '@/Interfaces/NewsProps';
import banner from '@/app/api/banner';
import BannerProps from '@/Interfaces/BannerProps';
import examBanner from '@/img/exam-banner.png';

export default async function Home({ params: { locale }}: { params: { locale: string }}) {
  const { t, resources } = await initTranslations(locale, ['dictionary']);
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

  const bannerData: BannerProps[] = await banner();
  
  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <BannerSwiper bannerData={bannerData} />
      <InfoSwiper news={newsData}/>
      <SafetyPreview />
      {locale === 'ge' && (
        <div className='examBannerCont'>        
          <a className='examBanner' href="https://etds.rta.gov.ge/index.php?route=extension/module/practice" target="_blank" rel="noopener noreferrer">
            <img src={examBanner.src} alt="exam banner image" />
          </a>
        </div>
      )}
      <TransferPreview />
      <Subscribe locale={locale} />
    </TranslationsProvider>
  );
}
