'use client';
import styles from './projectDetails.module.css';
import Fancybox from '@/components/FancyBox/Fancybox';
import PdfComponent from '@/components/PDF/PdfComponent';
import { useTranslation } from 'react-i18next';
import { FacebookShareButton } from 'react-share';
import innerProjectProps from '@/Interfaces/InnerProjectProps';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import defaultImage from '@/img/defaultProjectImg.png';
import Image from 'next/image';

export default function ProjectDetails({ rec_id, title, img, text, gallery, pdf, pdf_title}: Partial<innerProjectProps>) {
  const { t } = useTranslation();
  const shareUrl = 'http://github.com';
  const [galleryVisible, setGalleryVisible] = useState(true);
  const [showDefaultImage, setShowDefaultImage] = useState(true);

  useEffect(() => {
    if (gallery?.length === 0) {
      setGalleryVisible(false);
    }
  }, [gallery?.length]);

  useEffect(() => {
    if (img !== 'uploads_script/projects/') {
      setShowDefaultImage(false);
    }
  }, [img])

  return (
    <div className={styles.projectPage}>
      <p className={styles.name}>{t('completedProjects')}</p>
      { showDefaultImage && <Image src={defaultImage} alt="default Image"/> }
      { !showDefaultImage && <img src={`http://admin.rta.gov.ge/${img}`} alt={title} className={styles.mainImage} /> }
      <p className={styles.title}>{title}</p>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{
          __html: text!
        }}
      />
      { pdf !== '' && <PdfComponent title={pdf_title!} href={pdf!} /> }
      <div className='fancyboxContainer'>
      {
        galleryVisible && (
        <Fancybox
          options={{
            Carousel: {
              infinite: false,
            },
          }}>
            {gallery!.map((item, index) => (
              <div
                key={index}
                className="f-carousel__slide"
                data-fancybox="gallery"
                data-src={`http://admin.rta.gov.ge/${item.img}`}
                data-thumb-src={`http://admin.rta.gov.ge/${item.img}`}
              >
                <img src={`http://admin.rta.gov.ge/${item.img}`} alt="news images" className={styles.newsImage} />
              </div>
            ))}
        </Fancybox>
        )
      }
      </div>
      <div className={styles.decoration}></div>
      <div className={styles.share}>
        <div className={styles.goback}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12.301" height="10.767" viewBox="0 0 12.301 10.767">
            <path d="M10.589,7.2a.769.769,0,0,0-1.084-.1L6.152,9.889V.769a.769.769,0,0,0-1.538,0v9.12L1.262,7.1A.77.77,0,1,0,.278,8.281l4.614,3.845.115.069.1.054a.769.769,0,0,0,.554,0l.1-.054.115-.069,4.614-3.845a.769.769,0,0,0,.1-1.084Z" transform="translate(12.301) rotate(90)" fill="#0eaca7"/>
          </svg>
          <Link 
            href={'/info/information/projects'}>
            {t('goBack')}
          </Link>
        </div>
        <div className={styles.shareMedia}>
          <p>{t('share')}:</p>
          <FacebookShareButton url={shareUrl}>
            <svg xmlns="http://www.w3.org/2000/svg" width="9.844" height="20.255" viewBox="0 0 9.844 20.255">
              <path id="facebook" d="M2.513,20.255v-9.5H0V7.329H2.513V4.406C2.513,2.109,4,0,7.418,0A20.769,20.769,0,0,1,9.827.133l-.08,3.2s-1.044-.01-2.184-.01c-1.233,0-1.431.568-1.431,1.512v2.5H9.844l-.161,3.422H6.131v9.5H2.513"/>
            </svg>
          </FacebookShareButton>
        </div>
        </div>
    </div>
  )
}