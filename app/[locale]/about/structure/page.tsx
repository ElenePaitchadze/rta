import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '../../../i18n';
import { getFilteredData } from '@/HelperFunctions/filterAbouData';
import { getContentID } from '@/HelperFunctions/getContentId';

export default async function Structure({ params: { locale }}: { params: { locale: string }}) {
  // get content id
  const contentId = await getContentID('/about', '/structure');

  // apiData based on title
  const structureData = await getFilteredData(contentId, locale);

  // For Translation
  const { t, resources } = await initTranslations(locale, ['dictionary']);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <section className='about structure'>
        <div
          dangerouslySetInnerHTML={{
            __html: structureData[0].content
          }}
        />
      </section>
    </TranslationsProvider>
  )
}