import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '../../../i18n';
import { getFilteredData } from '@/HelperFunctions/filterAbouData';
import { getContentID } from '@/HelperFunctions/getContentId';

export default async function Purpose({ params: { locale }}: { params: { locale: string }}) {
  // get content id
  const contentId = await getContentID('/about', '/purpose');

  // get purpose page data from api
  const purposeData = await getFilteredData(contentId, locale);

  // For Translation
  const { t, resources } = await initTranslations(locale, ['dictionary']);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <section className='about'>
        <div
          dangerouslySetInnerHTML={{
            __html: purposeData[0].content
          }}
        />
      </section>
    </TranslationsProvider>
  )
}