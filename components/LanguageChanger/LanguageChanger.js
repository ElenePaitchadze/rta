'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';
import styles from './language.module.css';

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (newLocale) => {
    // set cookie for next-i18n-router
    const days = 1;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;
  
    // Get the current URL and parse it to obtain the pathname and search parameters
    const currentUrl = new URL(window.location.href);
    const currentPathname = currentUrl.pathname;
    const currentSearchParams = currentUrl.search;
  
    // Construct the new pathname based on the new locale
    let newPathname;
    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      newPathname = `/${newLocale}${currentPathname}`;
    } else {
      newPathname = currentPathname.replace(`/${currentLocale}`, `/${newLocale}`);
    }
  
    // Construct the new URL by combining the new pathname and the existing search parameters
    const newUrl = `${newPathname}${currentSearchParams}`;
  
    // Navigate to the new URL
    router.push(newUrl);
    router.refresh();
  };

  return (
    <div className={styles.buttons}>
      <button onClick={() => handleChange('ge')} 
              className={currentLocale === 'ge' ? styles.active : styles.button}
      >GE</button>
      <button onClick={() => handleChange('en')} 
              className={currentLocale === 'en' ? styles.active : styles.button}
      >EN</button>
    </div>
  );
}
