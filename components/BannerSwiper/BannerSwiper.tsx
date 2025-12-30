'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay'; // Ensure you have imported autoplay CSS
import BannerProps from '@/Interfaces/BannerProps';

export default function BannerSwiper({ bannerData }: {bannerData: BannerProps[]}) {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      effect="fade"
      pagination={{ clickable: true }}
      centeredSlides={true}
      // loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, EffectFade, Autoplay]}
      className='bannerSwiper'
    >
      {
        bannerData.map((banner, index) => (
          <SwiperSlide key={index}>
          {banner.img && banner.img !== 'uploads_script/banner/' && (
            <img src={`http://admin.rta.gov.ge/${banner.img}`} alt="banner image" />
          )}
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}