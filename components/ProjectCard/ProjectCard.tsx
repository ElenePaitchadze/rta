'use client';
import styles from './projectCard.module.css';
import ProjectProps from '@/Interfaces/ProjectProps';
import Image from 'next/image';
import Link from 'next/link';
import arrow from '@/img/arrowright.png';
import { useTranslation } from 'react-i18next';
import defaultImage from '@/img/defaultProjectBanner.png'

export default function ProjectCard({ rec_id, title, intro, img }: Partial<ProjectProps>) {
  const { t } = useTranslation();

  let isImageAvail: boolean = true;
  if (img === 'uploads_script/projects/' || !img) {
    isImageAvail = false;
  }

  return (
    <div className={styles.projectCard}>
      <Link className={styles.imageContainer} href={`/info/projects/${rec_id}`}>
        {isImageAvail && (
          <img src={`http://rta.gov.ge/${img}`} alt='project image' />
        )}
        {!isImageAvail && (
          <Image src={defaultImage} alt="project image" priority={true}/>
        )}
      </Link>
      <div>
        <Link href={`/info/projects/${rec_id}`} className={styles.title}>{title}</Link>
        <Link href={`/info/projects/${rec_id}`} className={styles.content}>{intro}</Link>
        <Link href={`/info/projects/${rec_id}`} className={styles.seeMore}>
            <span>{t('detail')}</span>
            <Image src={arrow} alt="right arrow"></Image>
          </Link>
      </div>
    </div>
  );
}