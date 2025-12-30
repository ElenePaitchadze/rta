'use client';
// For swiper 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Other imports
import styles from "./infoSwiper.module.css";
import InfoCard from '@/components/InfoCard/InfoCard';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import NewsProps from '@/Interfaces/NewsProps';

const breaks = {
  320: {
    slidesPerView: 1,
  },
  753: {
    slidesPerView: 2,
  },
  1080: {
    slidesPerView: 3,
  }
}


export default function InfoSwiper({ news }: { news: NewsProps[] }) {
  const { t } = useTranslation();

  return (
  <section className={styles.swiperContainer}>
    <p>{t('news')}</p>
    <Link href="./news">{t('all')}</Link>
    <div className={styles.swiperContent}>
      <Swiper
        modules={[ Pagination ]}
        spaceBetween={10}
        slidesPerView={3}
        pagination={{ clickable: true }}
        breakpoints={breaks}
        className='mySwiper'
        centeredSlides={false}
        centerInsufficientSlides={true}
      >
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <InfoCard
              rec_id={item.rec_id}
              img={item.img}
              date={item.date}
              title={item.title}
              intro={item.intro}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
  );
}