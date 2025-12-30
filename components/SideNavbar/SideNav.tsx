'use client'
import MenuItem from '@/Interfaces/MenuItemsProps';
import styles from './sideNav.module.css';
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function SideNav(  
  { items, params: { locale }, destination }: 
  { items: MenuItem[], params: { locale: string }, destination: string }) {

  const pathname: string = usePathname();
  const isActive = (href: string) => pathname === href || pathname === `/en${href}`;

  return (
    <div className={styles.sideNav}>
      {
        items.map((item) => (
          <Link 
            key={item.cat_id}
            href={`${destination}${item.slug.toLowerCase()}`}
            className={isActive(`${destination}${item.slug.toLowerCase()}`) ? `${styles.active} ${styles.link}` : styles.link}
          >{locale === 'ge' ? item.name.geo : item.name.eng.toUpperCase()}</Link>
        ))
      }
    </div>
  )
}