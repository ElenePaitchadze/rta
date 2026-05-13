import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '../../../i18n'
import { getFilteredData } from "@/HelperFunctions/filterAbouData";
import { getContentID } from '@/HelperFunctions/getContentId';

export default async function AboutUsChild(
  { params: { locale, aboutChild } }: 
  { params: { locale: string; aboutChild: string } }
) {
  // get content id using child slug
  const contentId = await getContentID('/about', `/${aboutChild}`);

  // get data from api
  const missionData = await getFilteredData(contentId, locale);

  // translations
  const { resources } = await initTranslations(locale, ['dictionary']);

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