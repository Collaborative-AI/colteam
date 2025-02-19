// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import colteam_logo from '../assets/images/nature-1.jpg'
import colteam_loo from '../assets/images/nature-2.jpg'
import colteam_lo from '../assets/images/nature-3.jpg'
import { Flex } from 'antd';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default () => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        autoplay={true}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide><img style={{ width: '100%' }} src={colteam_logo} /></SwiperSlide>
        <SwiperSlide><img style={{ width: '100%' }} src={colteam_loo} /></SwiperSlide>
        <SwiperSlide><img style={{ width: '100%' }} src={colteam_lo} /></SwiperSlide>
      </Swiper>
      <Flex gap="middle" vertical>
        <Flex vertical={false}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} style={{ width: '34%', backgroundColor: '#1677ff', height: '200px' }}>123</div>
          ))}
        </Flex>
      </Flex>
    </>
  );
};