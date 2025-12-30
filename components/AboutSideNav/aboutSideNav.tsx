'use client'
import styles from './aboutSideNav.module.css';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import MenuItem from '@/Interfaces/MenuItemsProps';
import React from 'react';

export default function AboutSideNav(  
  { items, params: { locale }, destination }: 
  { items: MenuItem[], params: { locale: string }, destination: string }) {

  const pathname: string = usePathname();
  const isActive = (href: string) => pathname === href || pathname === `/en${href}`;
  const isReformPage = pathname.startsWith('/about/reform') || pathname.startsWith('/en/about/reform');

  return (
    <div className={!isReformPage ? styles.sideNav : styles.sideNav1}>
      {items.map((link, index) => (
        <React.Fragment key={link.cat_id}>
          <Link 
            href={`${destination}${link.slug}`} 
            className={isActive(`${destination}${link.slug}`) ? `${styles.active} ${styles.link}` : styles.link}>
            {locale === 'ge' ? link.name.geo : link.name.eng.toUpperCase()}
          </Link>
          {index === 2 && isReformPage && link.children && (
            <div className={styles.subCategories}>
              {link.children.map((subcategory) => (
                <Link 
                  key={subcategory.cat_id} 
                  href={`/about/reform${subcategory.slug}`} 
                  className={isActive(`/about/reform${subcategory.slug}`) ? `${styles.active1} ${styles.link}` : styles.link}>
                  {locale === 'ge' ? subcategory.name.geo : subcategory.name.eng.toUpperCase()}
                </Link>
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
