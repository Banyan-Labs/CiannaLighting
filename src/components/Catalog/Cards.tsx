import React, { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import './style/catalog.scss';

import '../Dashboard/DashboardPageLower/style/dashboardNav.scss';

interface catalogPros {
    catalogItem: any;
    setCatalogItem: any;
    catalogType: any;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setRenderPage: any;
    renderPage: any;
}

const Cards: FC<catalogPros> = ({
    setCatalogItem,
    catalogType,
    setRenderPage,
    renderPage,
}) => {
    const { setAllCatalog } = useAppSelector(({ project }) => project);
    const designsFound: any = [];
    const reduxData = setAllCatalog?.slice();

    const useDesigns = reduxData?.map((design, index) => {
        const allReceived =
            renderPage === 'designStyle'
                ? design?.designStyle.map((type: any) => {
                      if (!designsFound.includes(type)) {
                          designsFound.push(type);
                      }
                  })
                : design?.usePackages.map((type: any) => {
                      if (!designsFound.includes(type)) {
                          designsFound.push(type);
                      }
                  });

        if (renderPage === '') {
            return setRenderPage('');
        } else {
            allReceived;
        }

        // console.log('****design****', design);

        return (
            <div
                className="filter-catalog-container"
                key={index}
                onClick={() => {
                    // console.log('design', design);
                    setCatalogItem(design);
                }}
            >
                <div className="catalog-item d-flex row align-content-start m-0">
                    <img className="m-0 p-0" src={design.images[0]} />
                    <div className="item-bottom-sections">
                        <h4 className="">
                            {design.itemName}
                            <br /> <span>{design.item_ID}</span>
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
                    <div className="main-catalog-filter-container d-flex m-0">
                        <div className="col-12 d-flex row m-0 p-0">
                            <h4 className="d-flex justify-content-center">
                                Catalog items found for: <b>{catalogType}</b>
                            </h4>
                            <h5 className="">
                                {' '}
                                {renderPage === 'designStyle'
                                    ? 'All Design Styles:'
                                    : 'All Use Packages:'}{' '}
                            </h5>
                            <div className="all-pulled-types d-flex col-12 justify-content-evenly m-0 p-0">
                                <ul className="col-3 col-lg-3 col-xl-2">
                                    {designsFound
                                        ? designsFound.map(
                                              (
                                                  ef: string,
                                                  index = ef.indexOf(ef)
                                              ) => {
                                                  return (
                                                      <li
                                                          className="col-10 col-xl-12 p-1"
                                                          key={index}
                                                      >
                                                          {ef
                                                              .toUpperCase()
                                                              .split(',')
                                                              .join(', ')}
                                                      </li>
                                                  );
                                              }
                                          )
                                        : ''}
                                </ul>
                                <div className="d-flex row col-8 col-lg-8 col-xl-9 m-0 p-0 cards-container">
                                    {useDesigns.map(
                                        (item: any, index: number) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="d-flex col-12 col-lg-6 col-xl-3 justify-content-center m-0 p-0"
                                                >
                                                    {item}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                ''
            )}
        </>
    );
};

export default Cards;
