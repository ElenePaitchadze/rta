'use client'
import styles from './legslationSideNav.module.css';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import MenuItem from '@/Interfaces/MenuItemsProps';
import React, { useState, useEffect } from 'react';

export default function LegislationSideNav(  
  { items, params: { locale }, destination }: 
  { items: MenuItem[], params: { locale: string }, destination: string }) {

  const [showSubCategories, setShowSubCategories] = useState(false);
  const subCategories = items[1].children;
  const pathname: string = usePathname();
  const isActive = (href: string) => pathname === href || pathname === `/en${href}`;
  const isAgreementPage = pathname.startsWith('/legislation/legal-acts') || pathname.startsWith('/en/legislation/legal-acts');

  const handleAgreementClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setShowSubCategories(!showSubCategories); 
  };

  useEffect(() => {
    if (pathname === '/legislation/legal-acts/eu-legislation' || 
        pathname === '/legislation/legal-acts/ormkchrivi-shetankhmeba' || 
        pathname === '/en/legislation/legal-acts/eu-legislation' || 
        pathname === '/en/legislation/legal-acts/ormkchrivi-shetankhmeba') {
      setShowSubCategories(true);
    }
  }, [pathname]);

  return (
    <div className={!isAgreementPage ? styles.sideNav : styles.sideNav1 }>
      {items.map((link, index) => (
      <React.Fragment key={index}>
        <Link 
          key={link.cat_id} 
          href={`${destination}${link.slug}`} 
          className={isActive(`${destination}${link.slug}`) ? `${styles.active} ${styles.link}` : styles.link}
          onClick={index === 1 ? handleAgreementClick : undefined}
        >
          {locale === 'ge' ? link.name.geo : link.name.eng.toUpperCase()}
        </Link>
        {index === 1 && showSubCategories && (
          <div className={styles.subCategories}>
            {subCategories.map((subcategory) => (
              <Link 
                key={subcategory.cat_id} 
                href={`/legislation/legal-acts${subcategory.slug}`} 
                className={isActive(`/legislation/legal-acts${subcategory.slug}`) ? `${styles.active1} ${styles.link}` : styles.link}>
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
