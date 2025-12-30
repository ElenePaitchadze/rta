import './globals.css';
import { Inter } from 'next/font/google';
import i18nConfig from '@/i18nConfig';
import { dir } from 'i18next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import menu from '@/app/api/menu';
import MenuItems from '@/Interfaces/MenuItemsProps';
import TestingComponent from '@/components/Testing/TestingComponent';
import TranslationsProvider from '@/components/TranslationsProvider';
import LanguageChanger from '@/components/LanguageChanger/LanguageChanger';
import initTranslations from '@/app/i18n';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Rail Transport Agency of Georgia',
  description: 'Rail Transport Agency of Georgia',
  openGraph: {
    images: 'https://admin.rta.gov.ge/uploads_script/news/2024/05/mxs9jn9qk4fip6j.png',
  },
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}


export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {
  // navbar content 
  const menuItems: MenuItems[] = await menu();
  const { t, resources } = await initTranslations(locale, ['dictionary']);

  return (
      <html lang='en' dir={dir(locale)}>
        <body className={inter.className}>
          {/* <TestingComponent params={{locale: locale}} /> */}
          <Header params={{locale: locale}} items={menuItems}>
            <TranslationsProvider resources={resources} locale={locale} namespaces={['dictionary']}>
              <LanguageChanger />
            </TranslationsProvider>
          </Header>
          <Navbar items={menuItems} params={{locale: locale}} />
          {children}
          <Footer params={{locale: locale}} />
        </body>
      </html>
  );
}
