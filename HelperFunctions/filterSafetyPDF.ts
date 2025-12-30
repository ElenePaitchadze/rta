import { newSafety, newTransfer, newInfo } from '@/app/api/safety';

// get parent safety elements' publications
export const newGetFilteredPDFs = async (slug: string, locale: string): Promise<any[]> => {
  try {
    const apiData = await newSafety();
    if (apiData === null) {
      console.error('Failed to fetch safety pdfs');
      throw new Error();
    }

    let filteredData: any[] = apiData.filter((item: any) => item.slug === slug);

    const languageCode = locale === 'ge' ? 'geo' : 'eng';
    filteredData = filteredData[0].publications.filter((item: any) => item.lang === languageCode);

    return filteredData;
  } catch (error) {
    console.error('Error fetching filtered PDF information:', error);
    return [];
  }
};


export const newTransferfilteredPdfs = async (slug: string, locale: string): Promise<any[]> => {
  try {
    const apiData = await newTransfer();
    if (apiData === null) {
      console.error('Failed to fetch safety pdfs');
      throw new Error();
    }

    let filteredData: any[] = apiData.filter((item: any) => item.slug === slug);

    const languageCode = locale === 'ge' ? 'geo' : 'eng';
    filteredData = filteredData[0].publications.filter((item: any) => item.lang === languageCode);

    return filteredData;
  } catch (error) {
    console.error('Error fetching filtered PDF information:', error);
    return [];
  }
};


export const newInfofilteredPdfs = async (slug: string, locale: string): Promise<any[]> => {
  try {
    const apiData = await newInfo();
    if (apiData === null) {
      console.error('Failed to fetch safety pdfs');
      throw new Error();
    }

    let filteredData: any[] = apiData.filter((item: any) => item.slug === slug);

    const languageCode = locale === 'ge' ? 'geo' : 'eng';
    filteredData = filteredData[0].publications.filter((item: any) => item.lang === languageCode);

    return filteredData;
  } catch (error) {
    console.error('Error fetching filtered PDF information:', error);
    return [];
  }
};


// get child safety elements' publications
export const childPdfs = async (parentSlug: string, childSlug: string, locale: string): Promise<any[]> => {
  try {
    const apiData = await newSafety();
    if (apiData === null) {
      console.error('Failed to fetch safety pdfs');
      throw new Error('Failed to fetch safety data');
    }

    const parentCategory = apiData.find((item: any) => item.slug === parentSlug);
    
    if (!parentCategory) {
      console.error('No parent category found with the given slug');
      return [];
    }

    const childCategory = parentCategory.children.find((child: any) => child.slug.toLowerCase() === childSlug);
    
    if (!childCategory) {
      console.error('No child category found with the given slug');
      return [];
    }

    const languageCode = locale === 'ge' ? 'geo' : 'eng';
    const filteredPublications = childCategory.publications.filter((pub: any) => pub.lang === languageCode);

    return filteredPublications;

  } catch (error) {
    console.error('Error fetching filtered PDF information:', error);
    return [];
  }
};

// get child transfer elements' publications
export const transferchildPdfs = async (parentSlug: string, childSlug: string, locale: string): Promise<any[]> => {
  try {
    const apiData = await newTransfer();
    if (apiData === null) {
      console.error('Failed to fetch safety pdfs');
      throw new Error('Failed to fetch safety data');
    }

    const parentCategory = apiData.find((item: any) => item.slug === parentSlug);
    
    if (!parentCategory) {
      console.error('No parent category found with the given slug');
      return [];
    }

    const childCategory = parentCategory.children.find((child: any) => child.slug.toLowerCase() === childSlug);
    
    if (!childCategory) {
      console.error('No child category found with the given slug');
      return [];
    }

    const languageCode = locale === 'ge' ? 'geo' : 'eng';
    const filteredPublications = childCategory.publications.filter((pub: any) => pub.lang === languageCode);

    return filteredPublications;

  } catch (error) {
    console.error('Error fetching filtered PDF information:', error);
    return [];
  }
};


// get child public informations' publications
export const infochildPdfs = async (parentSlug: string, childSlug: string, locale: string): Promise<any[]> => {
  try {
    const apiData = await newInfo();
    if (apiData === null) {
      console.error('Failed to fetch public info pdfs');
      throw new Error('Failed to fetch public info data');
    }

    const parentCategory = apiData.find((item: any) => item.slug === parentSlug);
    
    if (!parentCategory) {
      console.error('No parent category found with the given slug');
      return [];
    }

    const childCategory = parentCategory.children.find((child: any) => child.slug.toLowerCase() === childSlug);
    
    if (!childCategory) {
      console.error('No child category found with the given slug');
      return [];
    }

    const languageCode = locale === 'ge' ? 'geo' : 'eng';
    const filteredPublications = childCategory.publications.filter((pub: any) => pub.lang === languageCode);

    return filteredPublications;

  } catch (error) {
    console.error('Error fetching filtered PDF information:', error);
    return [];
  }
};