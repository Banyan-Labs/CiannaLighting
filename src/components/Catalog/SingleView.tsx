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
import { BsChevronLeft } from 'react-icons/bs';
import avatar2 from '../../assets/stairway.jpeg';

const SingleView: FC<catalogPros> = ({ 
    catalogItem,
     setCatalogItem,
      currentPage,
      setCurrentPage,
      setRenderPage, 
    renderPage
     }) =>  {
        const Item = catalogItem
      console.log(catalogItem)
    return (
        <div className='single-view-container'>
                        <p className='catalog-back' onClick={() => setCatalogItem(null)}>
                        <BsChevronLeft onClick={() => setCatalogItem(null)} className="chevron-icon-catalog" /> Back to
                        Catalog
                        </p>
          <div className='d-flex row'>
             <div className='main-img-catalog-container col-4'>
             <img src={avatar2} alt="img of light" />
             </div>
             <div className='main-img-catalog-container col-8'>
             <h2 className="m-0">
                        Acrylic Pendant
                    </h2>
             <h3>{Item?.item_ID}</h3>
             <h4>{Item?.itemDescription}</h4>

             <div className="d-flex align-items-center ">
                            <h5 className='m-0'>
                                Exterior Finish: 
                            </h5>
                              
                                {catalogItem.exteriorFinish.map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return ( 
                                                <div key={index} className='d-flex'>
                                              <p>
                                                      {ef}
                                             </p>
                                             </div>
                                              );
                                          }
                                      )}
                        </div>
                        <div className="d-flex align-items-center ">
                            <h5 className='m-0'>
                                Exterior Finish: 
                            </h5>
                              
                                {catalogItem.exteriorFinish.map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return ( 
                                                <div key={index} className='d-flex'>
                                              <p>
                                                      {ef}
                                             </p>
                                             </div>
                                              );
                                          }
                                      )}
                        </div>
                        <div className="d-flex align-items-center ">
                            <h5 className='m-0'>
                                Exterior Finish: 
                            </h5>
                              
                                {catalogItem.exteriorFinish.map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return ( 
                                                <div key={index} className='d-flex'>
                                              <p>
                                                      {ef}
                                             </p>
                                             </div>
                                              );
                                          }
                                      )}
                        </div>
                        <div className="d-flex align-items-center ">
                            <h5 className='m-0'>
                                Exterior Finish: 
                            </h5>
                              
                                {catalogItem.exteriorFinish.map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return ( 
                                                <div key={index} className='d-flex'>
                                              <p>
                                                      {ef}
                                             </p>
                                             </div>
                                              );
                                          }
                                      )}
                        </div>
             </div>
             
          </div>
        </div>
    );
};

export default SingleView;
