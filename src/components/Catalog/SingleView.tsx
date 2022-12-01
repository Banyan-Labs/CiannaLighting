import React, { FC } from 'react';
import './style/catalog.scss';
interface catalogPros {
    catalogItem: any;
    setCatalogItem: any;
}
import { BsChevronLeft } from 'react-icons/bs';
import avatar2 from '../../assets/stairway.jpeg';
import Tabs from './Tabs/Tabs';

const SingleView: FC<catalogPros> = ({ 
    catalogItem,
     setCatalogItem,
     }) =>  {
        const Item = catalogItem
      console.log(catalogItem)
    return (
        <div className='single-view-container'>
                        <p className='catalog-back' onClick={() => setCatalogItem(null)}>
                        <BsChevronLeft onClick={() => setCatalogItem(null)} className="chevron-icon-catalog" /> Back to
                        Catalog
                        </p>
          <div className='d-flex d-flex'>
             <div className='main-img-catalog-container '>
             <img src={avatar2} alt="img of light" />
             </div>
             <div className='main-right-tab-container'>
             {/* <h2 className="m-0">
                        Acrylic Pendant
                    </h2>
             <h3>{Item?.item_ID}</h3>
             <h4>{Item?.itemDescription}</h4> */}
             <Tabs
             catalogItem={catalogItem}
             setCatalogItem={setCatalogItem}
             />
             </div>
             
          </div>
        </div>
    );
};

export default SingleView;


{/* <div className="d-flex align-items-center ">
                            <h5 className='m-0'>
                            Interior Finish: 
                            </h5>
                              
                                {catalogItem.interiorFinish.map(
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
                        </div> */}
