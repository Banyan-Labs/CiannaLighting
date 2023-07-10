import React, { useCallback } from 'react';

import LightImageCarousel from './LightImageCarousel';
import LightSpecifications from './LightSpecifications';
import LightOptionsForm from './LightOptionsForm';
import BreadCrumb from 'components/commons/BreadCrumb/BreadCrumb';
import { CatalogLightItem } from 'typescript/CatalogItem';

import './createEditLight.style.scss';

type Props = {
    setCatalogItem: any;
    catalogItem: CatalogLightItem;
    editLight: any;
    setEditLight: any;
};

const CreateEditLight = ({
    setCatalogItem,
    catalogItem,
    editLight,
    setEditLight,
}: Props) => {
    const carouselImageData = catalogItem.images.map((img: string) => ({
        url: img,
    }));

    const returnToNull = () => {
        setEditLight(null);
        setCatalogItem(null);
    };

    const handleNavigationClick = useCallback(() => returnToNull(), []);

    return (
        <div className="light-details">
            <div className="light-details__heading">
                <BreadCrumb
                    stateAction={handleNavigationClick}
                    label="Back to Catalog"
                />
                {editLight && (
                    <span className="light-details__heading edit-prompt">
                        Editing Light in:
                        <span className="light-details__heading edit-prompt__room-name">
                            {editLight?.roomName}
                        </span>
                    </span>
                )}
            </div>
            <div className="light-details__content">
                <div className="light-details__carousel-wrapper">
                    <LightImageCarousel images={carouselImageData} />
                    <LightSpecifications lightDetails={catalogItem} />
                </div>
                <div className="light-details__description-wrapper">
                    <h2 className="light-details__item-name">
                        {catalogItem.itemName}
                    </h2>
                    <h3 className="light-details__item-id">
                        {catalogItem.item_ID}
                    </h3>
                    <p className="light-details__description-text">
                        {catalogItem.itemDescription}
                    </p>
                    <div className="light-details__form-wrapper">
                        <LightOptionsForm
                            catalogLightItem={catalogItem}
                            editLightItem={editLight}
                            setCatalogItem={setCatalogItem}
                            setEditLight={setEditLight}
                            lightSpecs={catalogItem.specs}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEditLight;
