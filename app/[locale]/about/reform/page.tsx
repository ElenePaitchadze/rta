import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '../../../i18n'
import { getFilteredData } from "@/HelperFunctions/filterAbouData";
import { getContentID } from '@/HelperFunctions/getContentId';

export default async function Reform({ params: { locale }}: { params: { locale: string }}) {
  // get content id
  const contentId = await getContentID('/about', '/reform');

  // get vision page data from api
  const reformData = await getFilteredData(contentId, locale);

  // For Translation
  const { t, resources } = await initTranslations(locale, ['dictionary']);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <section className='about'>
        <div
          dangerouslySetInnerHTML={{
            __html: reformData[0].content
          }}
        />
      </section>
    </TranslationsProvider>
  )
}