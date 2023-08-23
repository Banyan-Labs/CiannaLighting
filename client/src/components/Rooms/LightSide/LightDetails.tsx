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
                    <div className="col-12 d-flex row light-top-catalog justify-content-center">
                        <div className="d-flex row justify-content-center align-items-center">
                            <div className="col-12 d-flex justify-content-between align-items-center">
                                <div>
                                    <h2>
                                        Catalog Lights
                                    </h2>
                                </div>
                                <div className="d-flex flex-row">
                                    <SearchBar setSearchTerm={setSearchTerm} />
                                    <button
                                        className="d-flex justify-content-end align-items-center filter-lights-btn"
                                        onClick={() => setFilterBar(!filterBar)}
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Filter Lights"
                                    >
                                        <FaSlidersH className="dashboard-all-projects-submit" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p>
                            Select a light to view details.
                        </p>
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
