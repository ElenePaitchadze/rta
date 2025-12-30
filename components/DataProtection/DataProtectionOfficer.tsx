'use client';
import styles from './dataProtectionOfficer.module.css';
import icon from '@/img/emailIcon.svg';
import phoneIcon from '@/img/phoneIcon.svg';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function DataProtectionOfficer() {
  const { t } = useTranslation();
  return (
    <div className={styles.officerInfo}>
      <p className={styles.position}>{t('position')}</p>
      <p className={styles.officerName}>{t('officer')}</p>
      <div className={styles.email}>
        <Image src={icon} alt='email icon' priority={true} />
        <a href="mailto:l.mezvrishvili@rta.gov.ge">l.mezvrishvili@rta.gov.ge</a>
      </div>
      <div className={styles.phone}>
        <Image src={phoneIcon} alt='phone icon' priority={true} />
        <a href="tel: +995 599 26 62 84">599 26 62 84</a>
      </div>
    </div>
  );
}