import React, { FC } from 'react';
import './style/catalog.scss';
interface catalogPros {
    catalogItem: any;
    setCatalogItem: any;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setRenderPage:any; 
    renderPage:any
}

const SingleView: FC<catalogPros> = ({ 
    catalogItem,
     setCatalogItem,
      currentPage,
      setCurrentPage,
      setRenderPage, 
    renderPage
     }) =>  {

    return (
        <div className='single-view-container'>
          <h1>hello</h1>
        </div>
    );
};

export default SingleView;
