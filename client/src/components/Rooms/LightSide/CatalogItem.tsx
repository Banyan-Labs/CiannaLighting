import React, { FC } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import LightCarousel from './LightCarousel';
import LightSpecifications from './LightSpecifications';
import LightOptionsForm from './LightOptionsForm';
import { CatalogLightItem as CatalogItemType } from '../../../typescript/CatalogItem';

type Props = {
    setCatalogItem: any;
    catalogItem: CatalogItemType;
    editLight: any;
    setEditLight: any;
};

const CatalogItem: FC<Props> = ({
    setCatalogItem,
    catalogItem,
    editLight,
    setEditLight,
}) => {
    const carouselImageData = catalogItem.images.map((img: string) => ({
        url: img,
    }));

    const returnToNull = () => {
        setEditLight(null);
        setCatalogItem(null);
    };

    return (
        <div>
            {/* Start left wrapper */}
            <div style={{ border: '1px solid #7f6' }} className="">
                <LightCarousel images={carouselImageData} />

                <LightSpecifications lightDetails={catalogItem} />
            </div>
            {/* End left wrapper */}
            {/* Start right wrapper */}
            <div className="new-right-wrapper">
                <LightOptionsForm
                    catalogLightItem={catalogItem}
                    editLightItem={editLight}
                    setCatalogItem={setCatalogItem}
                    setEditLight={setEditLight}
                />
            </div>
            <div style={{ border: '1px solid #f33' }} className="">
                <p className="type-catalog-item m-0 col-6">Traditional</p>
                <p
                    onClick={() => returnToNull()}
                    className="catalog-back m-0 col-6"
                >
                    <BsChevronLeft className="chevron-icon" /> Back to Catalog
                </p>

                {/* HEADING START */}
                {editLight !== null ? (
                    <h5 className="d-flex justify-content-end">
                        Edit Light in {editLight?.roomName}
                    </h5>
                ) : (
                    ''
                )}

                <div className="col-12 d-flex justify-content-start p-0 name-id-catalog row">
                    <h2 className="">
                        {catalogItem.name} <br />{' '}
                        <span>{catalogItem.item_ID}</span>
                    </h2>
                    <p>{catalogItem.itemDescription}</p>
                </div>
                {/* HEADING END */}
            </div>
            {/* End right wrapper */}
        </div>
    );
};

export default CatalogItem;
