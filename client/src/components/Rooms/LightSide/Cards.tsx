import React, { FC, useEffect } from 'react';

import usePagination from './usePagination';
import { getCatalogItems } from '../../../redux/actions/lightActions';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import logging from 'config/logging';

interface searchBarProps {
    searchTerm: string;
    setCatalogItem: any;
    projectView: boolean;
}
const Cards: FC<searchBarProps> = ({ searchTerm, setCatalogItem, projectView }) => {
    const { setAllCatalog } = useAppSelector(({ project }) => project);

    const searchValue = setAllCatalog.filter((val: any) => {
        if (searchTerm === '') {
            return val;
        } else if (
            val.item_ID.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        ) {
            return val;
        }
    });

    const dispatch = useAppDispatch();
    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        gaps,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage: !projectView ? 12 : 8,
        count: searchValue.length,
    });

    const filteredData = setAllCatalog
        .filter((val: any) => {
            if (searchTerm === '') {
                return val;
            } else if (
                val.item_ID
                    .toLowerCase()
                    .includes(searchTerm.toLocaleLowerCase())
            ) {
                return val;
            } else page > 1 ? setPage(1) : '';
        })
        .slice(firstContentIndex, lastContentIndex)
        .map((el: any, index: any) => (
            <div
                className={
                    el.isActive
                        ? 'item-cards d-flex flex-column align-items-center justify-content-between py-3 m-2'
                        : 'item-cards d-flex flex-column align-items-center justify-content-between py-3 m-2 inactive-shadow'
                }
                key={index}
                onClick={() => {
                    if (el.isActive) {
                        setCatalogItem(el);
                    }
                }}
            >
                <img className="light-image" src={el.images[0]} />
                <span className="my-1">{el.item_ID}</span>
            </div>
        ));

    useEffect(() => {
        (async () => {
            try {
                dispatch(getCatalogItems());
            } catch (error) {
                logging.error(error);
            }
        })();
    }, []);

    return (
        <>
            <div className="your-rooms-section d-flex flex-wrap">
                {filteredData?.length ? (
                    filteredData
                ) : (
                    <div className="main-catalog-filter-container d-flex m-0">
                        <div className="col-12 d-flex row m-0 p-0">
                            <h4 className="d-flex justify-content-center">
                                No catalog items found.
                            </h4>
                        </div>
                    </div>
                )}
            </div>
            {(!projectView && searchValue.length > 12) || (projectView && searchValue.length > 8) ? (
                <div className="pagination_">
                    <p className="text">
                        Showing {page}/{totalPages}
                    </p>
                    <button
                        onClick={prevPage}
                        className={`page ${page === 1 && 'disabled'}`}
                    >
                        &larr;
                    </button>
                    <button
                        onClick={() => setPage(1)}
                        className={`page ${page === 1 && 'disabled'}`}
                    >
                        1
                    </button>
                    {gaps.before ? '...' : null}

                    {gaps.paginationGroup.map((el: any) => (
                        <button
                            onClick={() => setPage(el)}
                            key={el}
                            className={`page ${page === el ? 'active' : ''}`}
                        >
                            {el}
                        </button>
                    ))}
                    {gaps.after ? '...' : null}
                    <button
                        onClick={() => setPage(totalPages)}
                        className={`page ${page === totalPages && 'disabled'}`}
                    >
                        {totalPages}
                    </button>
                    <button
                        onClick={nextPage}
                        className={`page ${page === totalPages && 'disabled'}`}
                    >
                        &rarr;
                    </button>
                </div>
            ) : (
                ''
            )}
        </>
    );
};

export default Cards;
