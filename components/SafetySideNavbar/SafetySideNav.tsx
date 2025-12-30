'use client';
import styles from './safetySideNav.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuItem from '@/Interfaces/MenuItemsProps';
import React, { useState, useMemo } from 'react';

export default function SafetySideNav(
  { destination, items, params: { locale } }: 
  { destination: string, items: MenuItem[], params: { locale: string } }
) {
  const pathname: string = usePathname();

  const isActive = (href: string) => pathname === href || pathname === `/en${href}`;

  // Function to find the initially active parent based on pathname
  const findInitialActiveParent = useMemo(() => {
    for (const item of items) {
      if (isActive(`${destination}${item.slug.toLowerCase()}`)) {
        return item.slug.toLowerCase();
      }

      if (item.children) {
        for (const child of item.children) {
          if (isActive(`${destination}${item.slug.toLowerCase()}${child.slug.toLowerCase()}`)) {
            return item.slug.toLowerCase();
          }
        }
      }
    }
    return null;
  }, [pathname, destination, items]);

  const [activeParentSlug, setActiveParentSlug] = useState<string | null>(findInitialActiveParent);

  const toggleSubMenu = (parentSlug: string) => {
    setActiveParentSlug(activeParentSlug === parentSlug ? null : parentSlug);
  };

  return (
    <div className={styles.sideNav}>
      {items.map((link) => (
        <React.Fragment key={link.cat_id}>
          <div className={styles.parentLink}>
            <Link
              href={`${destination}${link.slug.toLowerCase()}`}
              className={isActive(`${destination}${link.slug.toLowerCase()}`) || pathname.includes(`${destination}${link.slug.toLowerCase()}`)
                ? `${styles.active} ${styles.link}`
                : styles.link}
              onClick={(e) => {
                if (link.children) {
                  toggleSubMenu(link.slug.toLowerCase());
                }
              }}
            >
              <p>{locale === 'ge' ? link.name.geo : link.name.eng.toUpperCase()}</p>
            </Link>
          </div>
          
          {link.children && link.children.length > 0 && activeParentSlug === link.slug.toLowerCase() && (
            <div className={styles.subCategories}>
              {link.children.map((subcategory) => (
                <Link
                  key={subcategory.cat_id}
                  href={`${destination}${link.slug.toLowerCase()}${subcategory.slug.toLowerCase()}`}
                  className={isActive(`${destination}${link.slug.toLowerCase()}${subcategory.slug.toLowerCase()}`)
                    ? `${styles.active1} ${styles.link}`
                    : styles.link}
                >
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