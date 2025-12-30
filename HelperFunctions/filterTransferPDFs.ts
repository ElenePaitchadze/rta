import SafetyProps from '@/Interfaces/SafetyProps';
import transfer from '@/app/api/transfer';

export const getFilteredPDFsTransfer = async (catId: string, locale: string): Promise<SafetyProps[]> => {
  try {
    const apiData = await transfer();
    if (apiData === null) {
      console.error('Failed to fetch transfer pdfs');
      throw new Error();
    }

    let filteredData: SafetyProps[] = apiData.filter((item: SafetyProps) => item.cat_id === catId);
    const languageCode = locale === 'ge' ? 'geo' : 'eng';
    filteredData = filteredData.filter((item: SafetyProps) => item.lang === languageCode);

    return filteredData;
  } catch (error) {
    console.error('Error fetching filtered PDF information:', error);
    // return an emply array
    return [];
  }
};