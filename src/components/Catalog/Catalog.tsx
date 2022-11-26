import React, { FC, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import Cards from './Cards';
import { useAppDispatch } from '../../app/hooks';
import { filterCatalogItems } from '../../redux/actions/lightActions';
import DesignStyles from './DesignStyles/DesignStyles';

import './style/catalog.scss';

const usePackagesData = [
    {
        name: "Bride's Room",
        img: '/pexels-kseniia-lopyreva-4959835.jpg',
    },
    {
        name: 'Celestial Room',
        img: '/celestial-room.jpeg',
    },
    {
        name: 'Baptistry',
        img: '/baptistry.jpeg',
    },
    {
        name: 'Hallway',
        img: '/hallway.jpeg',
    },
    {
        name: 'forier',
        img: '/reception.jpeg',
    },
    {
        name: 'ball-room',
        img: '/stairway.jpeg',
    }
];



const Catalog: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const [catalogItem, setCatalogItem] = useState(null);
    const [catalogType, setCatalogType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [renderPage, setRenderPage] = useState('');
    const dispatch = useAppDispatch();

  const fetchData1 = async (e: any) => {
      const value = e.currentTarget.value
            console.log(e.currentTarget.value)

        dispatch(filterCatalogItems({
            "usePackages": [value] }))
        };

        const usePackages = usePackagesData.map((usePackage, index) => {
            return (
                <div className="use-package-container" key={index}>
                   
                    <button 
                    key={usePackage.name}
                    style={{
                        backgroundImage: `url(/images${usePackage.img})`,
                        backgroundPosition: 'top',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        cursor: 'pointer'
                    }} className='use-package-image' value={usePackage.name} onClick={(e) => {
                    fetchData1(e);
                    setCatalogType(usePackage.name)
                    setRenderPage('usePackages')
                } } ></button>
                       
                    {usePackage.name}
                </div>
            );
        });
    return (
        <>
            {Object.keys(user).length === 0 ? (
                <Navigate to="/login" />
            ) : (
                <>
                    <div className="catalog-container">
                        <div className="catalog-main-container">
                            <DesignStyles catalogType={catalogType} setCatalogType={setCatalogType} setRenderPage={setRenderPage} renderPage={renderPage} />

                            <div className="catalog-use-packages">
                                <span>Use Packages</span>
                                <div className="catalog-use-packages-buttons">
                                    {usePackages}
                                </div>
                            </div>
                            
                            <Cards
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                             catalogItem={catalogItem}
                             setCatalogItem={setCatalogItem}
                             catalogType={catalogType}
                             setRenderPage={setRenderPage}
                              renderPage={renderPage}
                               />
                             
                        </div>
                        
                    </div>
                    
                </>
            )}
        </>
    );
};

export default Catalog;
