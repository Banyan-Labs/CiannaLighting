import React, { FC } from 'react';
import Data from './Data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Pictures: FC = () => {
    return (
        <>
            <Swiper
                className=" mySwiper pictures-container"
                slidesPerView={3}
                spaceBetween={20}
                slidesPerGroup={3}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Navigation, Pagination]}
            >
                {Data
                    ? Data.map((p, i) => {
                          return (
                              <SwiperSlide className="pictures-slide" key={i}>
                                  <img
                                      className="img-details"
                                      src={p.image}
                                      alt={p.name}
                                  />
                              </SwiperSlide>
                          );
                      })
                    : ''}
            </Swiper>
        </>
    );
};

export default Pictures;
