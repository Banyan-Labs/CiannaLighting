import React, { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import './style/catalog.scss';

import '../Dashboard/DashboardPageLower/style/dashboardNav.scss';
import avatar3 from '../../assets/reception.jpeg';

interface catalogPros {
    catalogItem: any;
    setCatalogItem: any;
    catalogType: any;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setRenderPage:any; 
    renderPage:any
}

const Cards: FC<catalogPros> = ({ 
     setCatalogItem,
      catalogType,
      setRenderPage, 
    renderPage
     }) => {
    const { setAllCatalog } = useAppSelector(
        ({ project }) => project
    );
    const designsFound: any = [];
    const reduxData =  setAllCatalog?.slice();
    
    const useDesigns = reduxData?.map((design, index) => {

        const allReceived = renderPage === 'designStyle' ? design?.designStyle.map((type: any) => {
            if (!designsFound.includes(type)) {
                designsFound.push(type);
            }
        }) : design?.usePackages.map((type: any) => {
            if (!designsFound.includes(type)) {
                designsFound.push(type);
            }
        })
           
           if(renderPage === ''){
             return setRenderPage('')
           } else { allReceived }
        
        return (
            <div className="filter-catalog-container" key={index}>
                <div
                    className="catalog-item d-flex row align-content-start ">
                    <img
                        className='m-0 p-0'
                        src={avatar3}
                        onClick={() => {
                            setCatalogItem(design);
                        }}
                    />
                    <div className="item-bottom-sections">
                        <h4 className="">
                            Acrylic Pendant <br />{' '}
                            <span>{design.item_ID}</span>
                        </h4>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <>
            {renderPage !== '' && setAllCatalog.length > 0 ? (
                <>
                    <div className=' main-catalog-filter-container d-flex flex-wrap justify-content-evenly'>
                        <div className='col-12 d-flex row'>
                        <h4 className=''>{`Catalog items found for ${catalogType}`}</h4>
                        <h5 className=''> {renderPage === 'designStyle' ? 'All Design Styles:' : 'All Use Packages:'} </h5>
                        <div className=' all-pulled-types d-flex '>
                        {designsFound
                            ? designsFound.map(
                                (
                                    ef: string,
                                    index = ef.indexOf(ef)
                                ) => {
                                    return (
                                        <span key={index}>
                                            {ef}
                                        </span>
                                    );
                                }
                            )
                            : ''}
                            </div>
                            </div>
                        {useDesigns}
                       
                    </div>
                </>
            ) : ''}
        </>
    );
};

export default Cards;