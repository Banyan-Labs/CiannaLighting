import React, { FC } from 'react';
import Data from './Data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import  useWindowDimensions  from './WindowW';

interface catalogPros {
    catalogItem: any;
}

const Pictures: FC<catalogPros> = ({
    catalogItem,
}) => {
    const { width } = useWindowDimensions();
    const Images = catalogItem?.images;
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

                {/* use this code when you go live  */}

                {/* {Images
                    ? Images?.map((p: any, i:any) => {
                          return (
                              <SwiperSlide className="pictures-slide-catalog" key={i}>
                                  <img
                                      className="img-item-details"
                                      src={p}
                                      alt={p}
                                  />
                              </SwiperSlide>
                          );
                      })
                    : ''} */}
                    {Data
                    ? Data?.map((p: any, i:any) => {
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
