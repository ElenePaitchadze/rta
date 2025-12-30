'use client';
import styles from './footer.module.css';
import Image from 'next/image';
import logo from '@/img/logo.svg';
import wheelchair from "@/img/wheelchair.png";
import Link from 'next/link';
import AdaptComponent from '../Adapt/AdaptComponent';
import { useState } from 'react';

export default function Footer({ params: { locale }}: { params: { locale: string }}) {
  const date = new Date();
  const [isAdaptComponentVisible, setIsAdaptComponentVisible] = useState(false);

  const handleAdaptClick = () => {
    setIsAdaptComponentVisible(!isAdaptComponentVisible);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerInfo}>
          <div className={styles.footerContact}>
            <p>{locale === 'ge' ? 'დაგვიკავშირდით' : 'CONTACT US'}</p>
            <p>{locale === 'ge' ? 'მისამართი' : 'Address'}</p>
            <p>{locale === 'ge' ? 'ქ. თბილისი' : 'St. Tbilisi'}</p>
            <p>{locale === 'ge' ? 'საბურთალო, ვ.უგრეხელიძის ქუჩა, N4' : 'Saburtalo, V. Ugrekhelidze Street, N4'}</p>
            {/* <a href="tel:+995 (422) 274925 / 2000 /2002">+995 (422) 274925 / 2000 /2002</a> */}
            <a href="tel:032 2 47 02 10">032 2 47 02 10</a>
            <a href="mailto:agency@rta.gov.ge">agency@rta.gov.ge</a>
            <div className={styles.mediaLinks}>
              <a href="https://www.facebook.com/profile.php?id=61556824572445" target='_blank'>
                <svg xmlns="http://www.w3.org/2000/svg" width="6.715" height="13.743" viewBox="0 0 6.715 13.743">
                  <path d="M1.714,13.743V7.295H0V4.973H1.714V2.989C1.714,1.431,2.727,0,5.06,0A14.239,14.239,0,0,1,6.7.09L6.648,2.258s-.712-.007-1.49-.007c-.841,0-.976.386-.976,1.026v1.7H6.715L6.6,7.295H4.182v6.449H1.714" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/rail-transport-agency-of-georgia/" target='_blank'>
                <svg xmlns="http://www.w3.org/2000/svg" width="13.055" height="12.477" viewBox="0 0 13.055 12.477">
                  <path d="M2.966,4.523v8.423H.161V4.523h2.8Zm.178-2.6a1.346,1.346,0,0,1-.429,1.037,1.6,1.6,0,0,1-1.151.417H1.547A1.534,1.534,0,0,1,.425,2.959,1.392,1.392,0,0,1,0,1.922,1.369,1.369,0,0,1,.438.881,1.6,1.6,0,0,1,1.581.469a1.554,1.554,0,0,1,1.13.412,1.418,1.418,0,0,1,.434,1.041Zm9.91,6.2v4.828h-2.8v-4.5a2.458,2.458,0,0,0-.344-1.4,1.21,1.21,0,0,0-1.075-.506,1.376,1.376,0,0,0-.9.293,1.808,1.808,0,0,0-.54.727,2.053,2.053,0,0,0-.094.688v4.7h-2.8q.017-3.391.017-5.5T4.522,4.931l-.008-.408h2.8V5.747H7.293a3.721,3.721,0,0,1,.349-.476,3.608,3.608,0,0,1,.48-.442,2.212,2.212,0,0,1,.739-.37,3.346,3.346,0,0,1,.973-.131,3.018,3.018,0,0,1,2.337.965,4.049,4.049,0,0,1,.884,2.826Z" transform="translate(0 -0.469)" />
                </svg>
              </a>
            </div>
            <Link 
              href='/' 
              className={locale === 'en' ? `${styles.logo} ${styles.logoEn}` : styles.logo}>
              <Image src={logo} alt='site logo' priority={true} />
              <span>{locale === 'ge' ? 'სარკინიგზო ტრანსპორტის სააგენტო' : 'RAIL TRANSPORT AGENCY OF GEORGIA'}</span>
            </Link>
          </div>
          <div className={styles.map}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d372.25051766149267!2d44.73505679169614!3d41.720429482649315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x404473dc26e90715%3A0xfdce6bff30b97ea2!2z4YOh4YOQ4YOg4YOZ4YOY4YOc4YOY4YOS4YOW4YOdIOGDouGDoOGDkOGDnOGDoeGDnuGDneGDoOGDouGDmOGDoSDhg6Hhg5Dhg5Dhg5Lhg5Thg5zhg6Lhg50!5e0!3m2!1sen!2sge!4v1715844744760!5m2!1sen!2sge" width="100%" height="195"></iframe>
          </div>
          <div className={styles.adapted}>
            <div className={styles.adaptContent} onClick={handleAdaptClick}>
              <Image src={wheelchair} alt='Website is adapted' priority={true}></Image>
              <p>{locale === 'ge' ? 'ვებგვერდი ადაპტირებულია' : 'THE WEBSITE HAS BEEN ADAPTED'}</p>
            </div>
            <div className={isAdaptComponentVisible ? `${styles.adaptComponent} ${styles.adaptComponentVisible}` : styles.adaptComponent}>
              <AdaptComponent params={{locale: locale}}/>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>{locale === 'ge' ? '© ყველა უფლება დაცულია rta.gov.ge' : '© All rights reserved rta.gov.ge'} {date.getFullYear()}</p>
          <p>Created by <a href="https://proservice.ge/" target='_blank'>Proservice</a></p>
        </div>
      </div>
    </footer>
  );
}