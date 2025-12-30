'use client'
import styles from './infoSideNav.module.css';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import MenuItem from '@/Interfaces/MenuItemsProps';
import React from 'react';

export default function InfoSideNav(  
  { items, params: { locale }, destination }: 
  { items: MenuItem[], params: { locale: string }, destination: string }) {

  const pathname: string = usePathname();
  const isActive = (href: string) => pathname === href || pathname === `/en${href}`;
  const isGeneralPage = pathname.startsWith('/info/information') || pathname.startsWith('/en/info/information');

  return (
    <div className={!isGeneralPage ? styles.sideNav : styles.sideNav1}>
      {items.map((link, index) => (
        <React.Fragment key={link.cat_id}>
          <Link 
            href={`${destination}${link.slug}`} 
            className={isActive(`${destination}${link.slug}`) ? `${styles.active} ${styles.link}` : styles.link}>
            {locale === 'ge' ? link.name.geo : link.name.eng.toUpperCase()}
          </Link>
          {index === 0 && isGeneralPage && link.children && (
            <div className={styles.subCategories}>
              {link.children.map((subcategory) => (
                <Link 
                  key={subcategory.cat_id} 
                  href={`/info/information${subcategory.slug}`} 
                  className={isActive(`/info/information${subcategory.slug}`) ? `${styles.active1} ${styles.link}` : styles.link}>
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
