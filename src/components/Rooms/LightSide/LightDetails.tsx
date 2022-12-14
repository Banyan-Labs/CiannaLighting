import React, { FC, useState } from 'react';
import '../style/roomDetails.scss';
import Cards from './Cards';
import SearchBar from './SearchBar';
import CatalogItem from './CatalogItem';
import { FaSlidersH } from 'react-icons/fa';

interface catalogPros {
    setCatalogItem: any;
    catalogItem: any;
    setEditLight: any;
    editLight: any;
    setFilterBar: any;
    filterBar: any;
}

const LightDetails: FC<catalogPros> = ({
    setCatalogItem,
    catalogItem,
    setEditLight,
    editLight,
    setFilterBar,
    filterBar,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    // const [catalogItem, setCatalogItem] = useState(null);

    return (
        <>
            {!catalogItem ? (
                <div className="container lightDetail-container m-0 mr-0 col-12 col-lg-5">
                    <div className="col-12 d-flex row light-top-catalog justify-content-center m-0">
                        <div className="d-flex row justify-content-center align-items-center">
                            <div className="col-12 d-flex justify-content-end align-items-center tooltip bs-tooltip-top">
                                <h2 className="col-6 col-md-6 m-0">
                                    Catalog<span>Lights</span>
                                </h2>
                                <SearchBar setSearchTerm={setSearchTerm} />
                            </div>

                            <div className="col-12 d-flex m-0 px-2 align-items-center tooltip bs-tooltip-top">
                                <p className="col-md-9 col-lg-8 m-0 p-0">
                                    Select a light to customize and add to your
                                    room.
                                </p>
                                <button
                                    className="col-md-3 col-lg-4 d-flex justify-content-end align-items-center filter-lights-btn"
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
                <div className="container lightDetail-container col-12 col-lg-5">
                    <CatalogItem
                        catalogItem={catalogItem}
                        setCatalogItem={setCatalogItem}
                        setEditLight={setEditLight}
                        editLight={editLight}
                    />
                </div>
            )}
        </>
    );
};

export default LightDetails;
