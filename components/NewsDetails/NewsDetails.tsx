'use client'
import styles from './newsDetails.module.css';
import InfoCard from '@/components/InfoCard/InfoCard';
import { FacebookShareButton } from 'react-share';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import defaultImg from '@/img/defaultNewsImg.png';
import defaultImg1 from '@/img/defaultNewsBanner.png';
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import InnerNewsProps from "@/Interfaces/InnerNewsProps";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

export default function NewsDetails(
  { rec_id, gallery, title, text, video, date, similar_news, img }: Partial<InnerNewsProps>) {
  
  // get date
  const dateArr = date!.split(',');
  const [day, month] = dateArr[0].split(' ');
  const year = dateArr[1];
  
  // for translation
  const { t } = useTranslation();
  
  // for FB sharing 
  const [shareUrl, setShareUrl] = useState('');
  const [showDefaultImage, setShowDefaultImage] = useState(true);
  const swiperRef = useRef<any>(null);
  const thumbnailSwiperRef = useRef<any>(null); // Ref for the thumbnail gallery Swiper

  // Add the main image to the beginning of the gallery
  const extendedGallery = img !== 'uploads_script/news/' ? [{ img }, ...gallery!] : gallery;

  const [decodedTitle, setDecodedTitle] = useState('');

  useEffect(() => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = title || '';
    const decodedText = textarea.value;
    setDecodedTitle(decodedText);
  }, [title]);


  useEffect(() => {
    if (extendedGallery!.length !== 0) {
      setShowDefaultImage(false);
    }
  }, [extendedGallery?.length]);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  return (
    <section className={styles.newsContainer}>
      <div className={styles.newsContent}>
        <div className={styles.newsDetail}>
          {showDefaultImage ? (
            <>
              <Image src={defaultImg} alt="news images" className={`${styles.newsImage} ${styles.defImg}`} />
              <Image src={defaultImg1} alt="news images" className={`${styles.newsImage} ${styles.defImg1}`} />
            </>
          ) : extendedGallery!.length > 0 ? (
            <>
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                effect="fade"
                pagination={{ clickable: true }}
                centeredSlides={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Pagination, EffectFade, Autoplay]}
                className='newsGallery'
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
              >
                {
                  extendedGallery!.map((image, index) => (
                    <SwiperSlide key={index}>
                      {image.img && image.img !== 'uploads_script/news/galleries/' && (
                        <img src={`http://admin.rta.gov.ge/${image.img}`} alt="banner image" />
                      )}
                    </SwiperSlide>
                  ))
                }
              </Swiper>

              {/* Thumbnail Swiper */}
              <Swiper
                spaceBetween={10}
                slidesPerView={4} 
                modules={[Pagination]}
                className={styles.galleryButtons}
                onSwiper={(swiper) => {
                  thumbnailSwiperRef.current = swiper;
                }}
              >
                {
                  extendedGallery!.map((image, index) => (
                    <SwiperSlide key={index}>
                      <button onClick={() => {
                        swiperRef.current?.slideTo(index); 
                        thumbnailSwiperRef.current?.slideTo(index); 
                      }} className={styles.thumbnailBtn}>
                        <img src={`http://admin.rta.gov.ge/${image.img}`} alt="gallery thumbnail" className={styles.thumbnail} />
                      </button>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </>
          ) : <img src={`http://admin.rta.gov.ge/${img}`} alt="news images" className={`${styles.newsImage}`} />}

          <div className={styles.newsHeading}>
            <div className={styles.date}>
              <p>{day}</p>
              <div className={styles.month}>
                <p>{month}</p>
                <p>{year}</p>
              </div>
            </div>
            <p className={styles.title}>{decodedTitle}</p>
          </div>

          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: text!
            }}
          />

          {/* <iframe src={video} className={styles.video}></iframe> */}

          <div className={styles.decoration}></div>

          <div className={styles.share}>
            <div className={styles.goback}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12.301" height="10.767" viewBox="0 0 12.301 10.767">
                <path d="M10.589,7.2a.769.769,0,0,0-1.084-.1L6.152,9.889V.769a.769.769,0,0,0-1.538,0v9.12L1.262,7.1A.77.77,0,1,0,.278,8.281l4.614,3.845.115.069.1.054a.769.769,0,0,0,.554,0l.1-.054.115-.069,4.614-3.845a.769.769,0,0,0,.1-1.084Z" transform="translate(12.301) rotate(90)" />
              </svg>
              <Link href='/news'>{t('goBack1')}</Link>
            </div>
            <div className={styles.shareMedia}>
              <p>{t('share')}:</p>
              <FacebookShareButton url={shareUrl} title={title}>
                <svg xmlns="http://www.w3.org/2000/svg" width="9.844" height="20.255" viewBox="0 0 9.844 20.255">
                  <path d="M2.513,20.255v-9.5H0V7.329H2.513V4.406C2.513,2.109,4,0,7.418,0A20.769,20.769,0,0,1,9.827.133l-.08,3.2s-1.044-.01-2.184-.01c-1.233,0-1.431.568-1.431,1.512v2.5H9.844l-.161,3.422H6.131v9.5H2.513"/>
                </svg>
              </FacebookShareButton>
            </div>
          </div>
        </div>
        <div className={styles.otherNewsContainer}>
          <p>{t('otherNews')}</p>
          <div className={styles.otherNews}>
            {
              similar_news!.map((item) => (
                <InfoCard
                  key={item.rec_id}
                  rec_id={item.rec_id}
                  img={item.img}
                  date={item.date}
                  title={item.title}
                  intro={item.intro}
                />
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
}
