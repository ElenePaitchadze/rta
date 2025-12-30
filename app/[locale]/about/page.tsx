import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '../../i18n'
import { getFilteredData } from "@/HelperFunctions/filterAbouData";
import { getContentID } from '@/HelperFunctions/getContentId';

export default async function AboutUs({ params: { locale }}: { params: { locale: string }}) {
  // get content id
  const contentId = await getContentID('/about', '');
 
  // get data from api
  const missionData = await getFilteredData(contentId, locale);

  // For Translation
  const { t, resources } = await initTranslations(locale, ['dictionary']);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <section className='about'>
        <div
          dangerouslySetInnerHTML={{
            __html: missionData[0].content
          }}
        />
      </section>
    </TranslationsProvider>
  );
}