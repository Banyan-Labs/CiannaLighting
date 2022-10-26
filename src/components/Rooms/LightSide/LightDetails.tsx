import React, { FC, useState } from 'react';
import '../style/roomDetails.scss';
import Cards from './Cards';
import SearchBar from './SearchBar';
import CatalogItem from './CatalogItem';

interface catalogPros {
    setCatalogItem: any;
    catalogItem: any;
    setEditLight: any;
    editLight: any;
    
}

const LightDetails: FC<catalogPros> = ({ setCatalogItem, catalogItem, setEditLight, editLight }) => {
    const [searchTerm, setSearchTerm] = useState('');
    // const [catalogItem, setCatalogItem] = useState(null);

    return (
        <>
            {!catalogItem ? (
                <div className="container lightDetail-container col-10 col-lg-5">
                    <div className="col-12 d-flex row light-top-catalog justify-content-center m-0">
                        <div className="d-flex row justify-content-between align-items-center">
                            <h2 className="col-6 m-0">
                                Catalog<span>Lights</span>
                            </h2>
                            <SearchBar setSearchTerm={setSearchTerm} />
                        </div>
                        <p className="col-12">
                            Select a light to customize and add to your room.
                        </p>
                        <Cards
                            searchTerm={searchTerm}
                            setCatalogItem={setCatalogItem}
                        />
                    </div>
                </div>
            ) : (
                <div className="container lightDetail-container col-12 col-lg-7">
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
