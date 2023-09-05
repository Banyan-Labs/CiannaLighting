import React, { useCallback } from 'react';

import LightOptionsForm from './LightOptionsForm';
import { CatalogLightItem } from 'typescript/CatalogItem';

import './createEditLight.style.scss';
import SingleView from 'components/Catalog/SingleView';
import { BsChevronLeft } from 'react-icons/bs';

type Props = {
    setCatalogItem: any;
    catalogItem: CatalogLightItem;
    editLight: any;
    setEditLight: any;
    projectView: boolean;
};

const CreateEditLight = ({
    setCatalogItem,
    catalogItem,
    editLight,
    setEditLight,
    projectView,
}: Props) => {
    const returnToNull = () => {
        setEditLight(null);
        setCatalogItem(null);
    };

    const handleNavigationClick = useCallback(() => returnToNull(), []);

    return (
        <div className="light-details">
            <div className="col-12 d-flex justify-content-between align-items-center back-button-container">
                <div className="back-to-project">
                    <a
                        className="back-to-all-projects"
                        onClick={handleNavigationClick}
                    >
                        <BsChevronLeft className="chevron-icon" /> Back to
                        Catalog
                    </a>
                </div>
                {editLight && (
                    <span className="light-details__heading edit-prompt">
                        Editing Light in:
                        <span className="light-details__heading edit-prompt__room-name">
                            {editLight?.roomName}
                        </span>
                    </span>
                )}
            </div>
            <div className="light-details__content d-flex flex-column">
                <SingleView
                    catalogItem={catalogItem}
                    setCatalogItem={setCatalogItem}
                    showBack={false}
                    projectView={projectView}
                />

                {projectView && (
                    <div className="align-self-center d-flex justify-content-center light-details__description-wrapper">
                        <LightOptionsForm
                            catalogLightItem={catalogItem}
                            editLightItem={editLight}
                            setCatalogItem={setCatalogItem}
                            setEditLight={setEditLight}
                            lightSpecs={catalogItem.cutSheet}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateEditLight;
