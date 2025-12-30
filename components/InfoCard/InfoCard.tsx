'use client';
import Image from "next/image";
import Link from "next/link";
import styles from "./infoCard.module.css";
import arrow from "@/img/arrowright.png";
import { useTranslation } from 'react-i18next';
import NewsProps from "@/Interfaces/NewsProps";
import defaultImage from '@/img/defaultNewsBanner.png';
import { useState, useEffect } from "react";

export default function InfoCard({ rec_id, img, date, title, intro }: Partial<NewsProps>) {
  // check if the image exists, otherwise show default image
  let isImageAvail: boolean = true;
  if (img === 'uploads_script/news/' || !img) {
    isImageAvail = false;
  }
  
  // get date 
  const dateArr = date!.split(',');
  const [day, month] = dateArr[0].split(' ');
  const year = dateArr[1];

  // for translation
  const { t } = useTranslation();

  // use decoded title to avoid any html codes
  const [decodedTitle, setDecodedTitle] = useState('');

  useEffect(() => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = title || '';
    const decodedText = textarea.value;
    setDecodedTitle(decodedText);
  }, [title]);

  return (
    <div className={styles.infoPreview}>
      <Link className={styles.imageContainer} href={`/news/${rec_id}`}>
        {isImageAvail && (
          <img src={`http://admin.rta.gov.ge/${img}`} alt='news image' />
        )}
        {!isImageAvail && (
          <Image src={defaultImage} alt="news image" priority={true}/>
        )}
      </Link>
      <div className={styles.preview}>
        <div className={styles.date}>
          <p>{ day }</p>
          <div className={styles.month}>
            <p>{ month }</p>
            <p>{ year}</p>
          </div>
        </div>
        <div className={styles.previewDetails}>
          <Link href={`/news/${rec_id}`} className={styles.title}>{decodedTitle}</Link>
          <Link href={`/news/${rec_id}`} className={styles.description}>{intro}</Link>
          <Link href={`/news/${rec_id}`} className={styles.seeMore}>
            <span>{t('detail')}</span>
            <Image src={arrow} alt="right arrow" priority={true}></Image>
          </Link>
        </div>
      </div>
    </div>
  )
}