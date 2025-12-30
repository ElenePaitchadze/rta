import aboutUs from '@/app/api/aboutUs';
import AboutUsProps from '@/Interfaces/AboutUsProps';

export const getFilteredData = async (contentId: string, locale: string): Promise<AboutUsProps[]> => {
  try {
    const apiData = await aboutUs(contentId);
    if (apiData === null) {
      console.error('Failed to fetch content page data');
      throw new Error();
    }

    let filteredData: AboutUsProps[] = apiData.filter((item: AboutUsProps) => item.rec_id === contentId);
    const languageCode = locale === 'ge' ? 'geo' : 'eng';
    filteredData = filteredData.filter((item: AboutUsProps) => item.lang === languageCode);

    return filteredData;
  } catch (error) {
    console.error('Error fetching Content Page:', error);
    return [];
  }
};