import React, { useState, useRef, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { SlSizeFullscreen } from 'react-icons/sl';
import ModalBase from '../../commons/ModalBase/ModalBase';
import './carousel.style.scss';

export type ImageType = { id: number; url: string };
type Props = {
    images?: ImageType[];
};

const LightCarousel = ({ images }: Props) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState<ImageType>();
    const [fullscreen, setFullscreen] = useState(false);
    const carouselItemsRef = useRef<HTMLDivElement[] | null[]>([]);

    useEffect(() => {
        if (images && images[0]) {
            carouselItemsRef.current = carouselItemsRef.current.slice(
                0,
                images.length
            );

            setSelectedImageIndex(0);
            setSelectedImage(images[0]);
        }
    }, [images]);

    const handleSelectedImageChange = (newIdx: number) => {
        if (images && images.length > 0) {
            setSelectedImage(images[newIdx]);
            setSelectedImageIndex(newIdx);
            if (carouselItemsRef?.current[newIdx]) {
                carouselItemsRef?.current[newIdx]?.scrollIntoView({
                    inline: 'center',
                    behavior: 'smooth',
                });
            }
        }
    };

    const handleRightClick = () => {
        if (images && images.length > 0) {
            let newIdx = selectedImageIndex + 1;
            if (newIdx >= images.length) {
                newIdx = 0;
            }
            handleSelectedImageChange(newIdx);
        }
    };

    const handleLeftClick = () => {
        if (images && images.length > 0) {
            let newIdx = selectedImageIndex - 1;
            if (newIdx < 0) {
                newIdx = images.length - 1;
            }
            handleSelectedImageChange(newIdx);
        }
    };

    return (
        <>
            <div className="carousel-container">
                <div className="img-wrapper">
                    <SlSizeFullscreen
                        className="fullscreen-toggle-button"
                        onClick={() => setFullscreen(!fullscreen)}
                    />
                    <img className="selected-image" src={selectedImage?.url} />
                </div>
                <div className="carousel">
                    <div className="carousel__images">
                        {images &&
                            images.map((image, idx) => (
                                <div
                                    onClick={() =>
                                        handleSelectedImageChange(idx)
                                    }
                                    style={{
                                        backgroundImage: `url(${image.url})`,
                                    }}
                                    key={image.id}
                                    className={`carousel__image ${
                                        selectedImageIndex === idx &&
                                        'carousel__image-selected'
                                    }`}
                                    ref={(el) =>
                                        (carouselItemsRef.current[idx] = el)
                                    }
                                />
                            ))}
                    </div>
                    <button
                        type="button"
                        className="carousel__button carousel__button-left"
                        onClick={handleLeftClick}
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        type="button"
                        className="carousel__button carousel__button-right"
                        onClick={handleRightClick}
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
            <ModalBase isShown={fullscreen} setIsShown={setFullscreen}>
                <div className="carousel__fullscreen-content-wrapper">
                    <img
                        className="fullscreen-image"
                        src={selectedImage?.url}
                    />
                    <button
                        type="button"
                        className="carousel__button carousel__button-left fullscreen-button"
                        onClick={handleLeftClick}
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        type="button"
                        className="carousel__button carousel__button-right fullscreen-button"
                        onClick={handleRightClick}
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </ModalBase>
        </>
    );
};

export default LightCarousel;
