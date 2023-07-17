import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface catalogProps {
    catalogItem: any;
}

const Pictures: FC<catalogProps> = ({ catalogItem }) => {
    const Images = catalogItem.images;
    
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
                {Images
                    ? Images.map((p: string, i: number) => {
                        return (
                            <SwiperSlide className="pictures-slide" key={i}>
                                <img
                                    className="img-details"
                                    src={p}
                                    alt={p}
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
