import React, { FC, useState } from 'react';
import { FaSlidersH } from 'react-icons/fa';

import Cards from './Cards';
import SearchBar from './SearchBar';
import CreateEditLight from './CreateEditLight';

import '../style/roomDetails.scss';

interface catalogPros {
    setCatalogItem: any;
    catalogItem: any;
    setEditLight: any;
    editLight: any;
    setFilterBar: any;
    filterBar: any;
    projectView: boolean;
}

const LightDetails: FC<catalogPros> = ({
    setCatalogItem,
    catalogItem,
    setEditLight,
    editLight,
    setFilterBar,
    filterBar,
    projectView
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
            {!catalogItem ? (
                <div className="lightDetail-container">
                    <div className="col-12 d-flex row light-top-catalog justify-content-center m-0">
                        <div className="d-flex row justify-content-center align-items-center">
                            <div className="col-12 d-flex justify-content-end align-items-center tooltip bs-tooltip-top">
                                <h2 className="col-6 col-md-6 m-0">
                                    Catalog Lights
                                </h2>
                                <SearchBar setSearchTerm={setSearchTerm} />
                            </div>

                            <div className="col-12 d-flex m-0 px-2 align-items-center justify-content-between tooltip bs-tooltip-top">
                                <p className="col-md-9 col-lg-8 m-0 p-0">
                                    Select a light to view details.
                                </p>
                                <button
                                    className="d-flex justify-content-end align-items-center filter-lights-btn"
                                    onClick={() => setFilterBar(!filterBar)}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Filter Lights"
                                >
                                    <p>Filter Lights</p>
                                    <FaSlidersH className="dashboard-all-projects-submit" />
                                </button>
                            </div>
                        </div>
                        <Cards
                            searchTerm={searchTerm}
                            setCatalogItem={setCatalogItem}
                        />
                    </div>
                </div>
            ) : (
                <div className="">
                    <CreateEditLight
                        catalogItem={catalogItem}
                        setCatalogItem={setCatalogItem}
                        setEditLight={setEditLight}
                        editLight={editLight}
                        projectView={projectView}
                    />
                </div>
            )}
        </>
    );
};

export default LightDetails;
