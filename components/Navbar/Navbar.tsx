'use client';
import styles from './navbar.module.css';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Search from '@/components/Search/Search';
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

// Redirect child links
const getChildRedirectUrl = (parentSlug: string, childSlug: string) => {
  switch(childSlug) {
    case '/legal-acts':
      return '/legislation/legal-acts/eu-legislation';
    default:
      return `${parentSlug.toLowerCase()}${childSlug.toLowerCase()}`;
  }
};

export default function Navbar(
  { items, params: { locale } }: 
  { items: MenuItem[], params: { locale: string } }) {

  const pathname: string = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  }

  return (
    <section className={styles.nav}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbar}>
          {items.map((item, index) => {
            const isActive =
              pathname.startsWith(item.slug.toLowerCase()) ||
              pathname.startsWith(`/en${item.slug.toLowerCase()}`);
            const hasChildren = item.children.length > 0;
            const href = getRedirectUrl(item.slug.toLowerCase());
            return (
              <div
                className={`${styles.navItems} ${isActive ? `${styles.active} ${styles.link}` : styles.link}`}
                key={index}
              >
                <Link 
                  key={item.cat_id} 
                  href={href} 
                  className={styles.parentLink}>
                  {locale === 'ge' ? item.name.geo : item.name.eng.toUpperCase()}
                </Link>
                {hasChildren && (
                  <div className={styles.children}>
                    {item.children.map((child) => {
                      const childRedirectUrl = getChildRedirectUrl(item.slug, child.slug);
                      return (
                        <Link 
                        href={childRedirectUrl} 
                        key={child.cat_id} 
                        className={styles.childLinks}>
                        {locale === 'ge' ? child.name.geo : child.name.eng.toUpperCase()}
                      </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            );
          })}
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="21.096" viewBox="0 0 30 21.096"
               onClick={handleMenuToggle}
               className={styles.toggle}>
            <g transform="translate(-3 -7.5)">
              <path d="M3,9A1.5,1.5,0,0,1,4.5,7.5h27a1.5,1.5,0,0,1,0,3H4.5A1.5,1.5,0,0,1,3,9Z"/>
              <path d="M3,18.048a1.5,1.5,0,0,1,1.5-1.5h27a1.5,1.5,0,0,1,0,3H4.5A1.5,1.5,0,0,1,3,18.048Z"/>
              <path d="M4.5,25.6a1.5,1.5,0,0,0,0,3h27a1.5,1.5,0,0,0,0-3Z"/>
            </g>
          </svg>
        </div>
      </div>
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
      </div>
    </section>
  )
}
