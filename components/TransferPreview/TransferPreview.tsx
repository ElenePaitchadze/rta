'use client';
import styles from './transferPreview.module.css';
import Link from 'next/link';
import passangers from '@/img/passangers.png';
import settings from '@/img/settings.png';
import LinkPreview from '@/components/LinkPreview/LinkPreview';
import Links from '@/Interfaces/Links';
import { useTranslation } from 'react-i18next';


export default function SafetyPreview() {
  const { t } = useTranslation();

  const transferLinks: Links[] = [
    { icon: passangers, text: t('passangerRights'), href: '/transfer/passanger-rights'},
    { icon: settings, text: t('communityObligation'), href: '/transfer/community-service-obligation'},
  ];

  return (
    <section className={styles.transferContainer}>
      <p>{t('transfer')}</p>
      <Link href='./transfer/passanger-rights'>{t('all1')}</Link>
      <div className={styles.transferContent}>
        {transferLinks.map((link, index) => (
          <LinkPreview key={index} icon={link.icon} text={link.text} href={link.href} />
        ))}
      </div>
    </section>
  )
}