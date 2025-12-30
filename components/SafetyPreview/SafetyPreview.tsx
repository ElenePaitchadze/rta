'use client';
import styles from './safetyPreview.module.css';
import Link from 'next/link';
import LinkPreview from '@/components/LinkPreview/LinkPreview'
import Links from '@/Interfaces/Links';
import train from '@/img/train.png';
import danger from '@/img/dangerous.png';
import fav from '@/img/favoritefile.png';
import { useTranslation } from 'react-i18next';

export default function SafetyPreview() {
  const { t } = useTranslation();
  const safetyLinks: Links[] = [
    { icon: train, text: t('security'), href: '/safety/safety-sertification', target: '_self'},
    { icon: danger, text: t('management'), href: '/safety/dangerous-goods', target: '_self'},
    { icon: fav, text: t('drivers'), href: '/safety/train-drivers', target: '_self'},
  ]

  return (
    <section className={styles.safetyContainer}>
      <p>{t('safety')}</p>
      <Link href='./safety/safety-sertification'>{t('all1')}</Link>
      <div className={styles.safetyContent}>
        {safetyLinks.map((link, index) => (
          <LinkPreview key={index} icon={link.icon} text={link.text} href={link.href} target={link.target} />
        ))}
      </div>
    </section>
  )
}