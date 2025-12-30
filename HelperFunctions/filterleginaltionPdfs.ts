import LegislationProps from '@/Interfaces/LegislationProps';
import legislation from '@/app/api/legislation';

export const filterlegislationPdfs = async (menuSlug: string, locale: string): Promise<LegislationProps[]> => {
  try {
    const apiData = await legislation();
    if (apiData === null) {
      console.error('Failed to fetch legislation pdfs');
      throw new Error();
    }

    let filteredData: LegislationProps[] = apiData.filter((item: LegislationProps) => item.menu_slug === menuSlug);
    
    const languageCode = locale === 'ge' ? 'geo' : 'eng';
    filteredData = filteredData.filter((item: LegislationProps) => item.lang === languageCode);

    return filteredData;
  } catch (error) {
    console.error('Error fetching filtered PDF information:', error);
    // return an emply array
    return [];
  }
};