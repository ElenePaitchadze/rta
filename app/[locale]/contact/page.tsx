import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '../../i18n';
import Contact from '@/components/Contact/Contact';

export default async function ContactPage(
  { searchParams, params: { locale }}: 
  { searchParams:  { [key: string]: string | string[] | undefined },
    params: { locale: string }}
) {
  const { t, resources } = await initTranslations(locale, ['dictionary']);
  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
      <Contact />
    </TranslationsProvider>
  );
}