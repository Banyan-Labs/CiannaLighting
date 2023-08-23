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
    projectView,
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
            {!catalogItem ? (
                <div className="lightDetail-container">
                    <div className="col-12 d-flex flex-column light-top-catalog justify-content-center">
                        <div className="d-flex row justify-content-center align-items-center">
                            <div className="col-12 d-flex justify-content-between align-items-center dashboard-project-overview no-wrap">
                                <div>
                                    <h4 className="page-title">Catalog Lights</h4>
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
                        <Cards
                            searchTerm={searchTerm}
                            setCatalogItem={setCatalogItem}
                            projectView={projectView}
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
