'use client';
import styles from './header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/img/logo.svg';
import Search from '@/components/Search/Search';
import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import MenuItem from '@/Interfaces/MenuItemsProps';

// Redirect parent links to children links
const getRedirectUrl = (slug: string) => {
  switch(slug) {
    case '/info':
      return '/info/information-about-staffing';
    case '/safety':
      return '/safety/safety-sertification';
    case '/transfer':
      return '/transfer/passanger-rights';
    default:
      return slug;
  }
};

export default function Header({ params: { locale }, children, items }: { params: { locale: string }, children: React.ReactNode, items: MenuItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isRootPath = pathname === '/' || pathname === '/en';

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 461);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // close menu when user will move to another page
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <section className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${!isRootPath ? styles.header1 : ''}`}>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Link
            href='/' 
            className={locale === 'en' ? `${styles.logo} ${styles.logoEn}` : styles.logo}>
            <Image src={logo} alt='site logo' priority={true} />
            <span>{locale === 'en' ? 'RAIL TRANSPORT AGENCY OF GEORGIA': 'სარკინიგზო ტრანსპორტის სააგენტო'}</span>
          </Link>
          <div className={styles.langSearch}>
            <Search />
            { children }
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="21.096" viewBox="0 0 30 21.096"
              onClick={handleMenuToggle}
              className={styles.toggle}>
              <g transform="translate(-3 -7.5)">
                <path d="M3,9A1.5,1.5,0,0,1,4.5,7.5h27a1.5,1.5,0,0,1,0,3H4.5A1.5,1.5,0,0,1,3,9Z" fill='white' />
                <path d="M3,18.048a1.5,1.5,0,0,1,1.5-1.5h27a1.5,1.5,0,0,1,0,3H4.5A1.5,1.5,0,0,1,3,18.048Z" fill='white' />
                <path d="M4.5,25.6a1.5,1.5,0,0,0,0,3h27a1.5,1.5,0,0,0,0-3Z" fill='white' />
              </g>
          </svg>
        </div>
      </header>
      <div className={isMenuOpen ? `dropdownMenu open` : 'dropdownMenu'}>
        <ul>
          {items.map((item) => {
            const isActive = pathname.startsWith(item.slug.toLowerCase()) ||
                             pathname.startsWith(`/en${item.slug.toLowerCase()}`)
            const href = getRedirectUrl(item.slug.toLowerCase());
            return (
              <Link 
                key={item.cat_id} 
                href={href}
                className={isActive ? `${styles.activeMobile} ${styles.linkMobile}` : styles.linkMobile}>
                { locale === 'ge' ? item.name.geo : item.name.eng.toUpperCase() }
              </Link>
            );
          })}
        </ul>
        <Search />
        { children }
      </div>
    </section>
  );
}