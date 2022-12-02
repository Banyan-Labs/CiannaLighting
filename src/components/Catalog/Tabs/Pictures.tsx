import React, { FC } from 'react';
import Data from './Data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import  useWindowDimensions  from './WindowW';

const Pictures: FC = () => {
    const { width } = useWindowDimensions();
    return (
        <>
            <Swiper
                className="mySwiper-catalog "
                slidesPerView={width < 800 ? 2 : 4}
                spaceBetween={0}
                slidesPerGroup={width < 800 ? 2 : 4}
                loop={false}
                loopFillGroupWithBlank={false}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Navigation, Pagination]}
            >
                {Data
                    ? Data.map((p, i) => {
                          return (
                              <SwiperSlide className="pictures-slide-catalog" key={i}>
                                  <img
                                      className="img-item-details"
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
