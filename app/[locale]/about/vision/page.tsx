import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '../../../i18n'
import { getFilteredData } from "@/HelperFunctions/filterAbouData";
import { getContentID } from '@/HelperFunctions/getContentId';

export default async function Vision({ params: { locale }}: { params: { locale: string }}) {
  // get content id
  const contentId = await getContentID('/about', '/vision');

  // get vision page data from api
  const visionData = await getFilteredData(contentId, locale);

  // For Translation
  const { t, resources } = await initTranslations(locale, ['dictionary']);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <section className='about'>
      {visionData.length > 0 && (
          <div
            dangerouslySetInnerHTML={{
              __html: visionData[0].content
            }}
          />
        )}
      </section>
    </TranslationsProvider>
  )
}