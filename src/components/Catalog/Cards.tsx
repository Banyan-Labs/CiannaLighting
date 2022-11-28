import React, { FC, useState } from 'react';
import { useAppSelector } from '../../app/hooks';

import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import Pagination from '../Dashboard/DashboardPageLower/Pagination/Pagination';
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
    catalogItem,
     setCatalogItem,
      catalogType,
      currentPage,
      setCurrentPage,
      setRenderPage, 
    renderPage
     }) => {
    const { setAllCatalog } = useAppSelector(
        ({ project }) => project
    );
    console.log(setAllCatalog)
    const projectsPerPage = 4;
    const designsFound: any = [];
    const reduxData =  setAllCatalog?.slice();
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const lastPage = Math.ceil(reduxData.length / projectsPerPage);
    const lastIndex = currentPage * projectsPerPage;
    const firstIndex = lastIndex - projectsPerPage;
    const sortedData = reduxData?.slice(firstIndex, lastIndex)
    const useDesigns = sortedData?.map((design, index) => {

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
                        <div className="pages-list">
                        <nav className='page-list-catalog d-flex justify-content-between'>
                            {sortedData ? (
                                <div className="table-showing2">
                                    Showing{' '}
                                    {currentPage}
                                    
                                    {currentPage * projectsPerPage >
                                    sortedData.length -  currentPage * projectsPerPage}{' '}
                                    of{' '}
                                    { lastPage }
                                </div>
                            ) : ''
                            }

                            <ul className="pagination">
                                {currentPage > 1 && (
                                    <li
                                        onClick={() =>
                                            setCurrentPage(currentPage - 1)
                                        }
                                        className="page-link"
                                    >
                                        <MdNavigateBefore
                                            className="arrow-pagination"
                                            id="arrow-pag-before"
                                        />
                                    </li>
                                )}
                                <Pagination
                                    totalProjects={reduxData ? reduxData.length - 1 : 0}
                                    projectsPerPage={projectsPerPage}
                                    currentPage={currentPage}
                                    paginate={(page: number) => paginate(page)}
                                />
                                {currentPage < lastPage  && (
                                    <li
                                        onClick={() => {
                                            setCurrentPage(currentPage + 1);
                                        }}
                                        className="page-link"
                                    >
                                        <MdNavigateNext
                                            className="arrow-pagination"
                                            id="arrow-pag-next"
                                        />
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                    </div>
                </>
            ) : ''}
        </>
    );
};

export default Cards;