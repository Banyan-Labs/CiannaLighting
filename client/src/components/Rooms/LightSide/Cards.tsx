import React, { FC, useEffect, useState } from 'react';

import usePagination from './usePagination';
import { getCatalogItems } from '../../../redux/actions/lightActions';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';

interface searchBarProps {
    searchTerm: string;
    setCatalogItem: any;
}
const Cards: FC<searchBarProps> = ({ searchTerm, setCatalogItem }) => {
    const { setAllCatalog, project } = useAppSelector(({ project }) => project);

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
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
        contentPerPage: 6,
        count: searchValue.length,
    });

    const filteredData = setAllCatalog
        .filter((val: any) => {
            if (searchTerm === '') {
                return val;
            } else if (
                val.item_ID
                    .toLowerCase()
                    .includes(
                        searchTerm.toLocaleLowerCase()
                    )
            ) {
                return val;
            } else page > 1 ? setPage(1) : '';
        })
        .slice(firstContentIndex, lastContentIndex)
        .map((el: any, index: any) => (
            <div
                className={el.isActive && !project?.archived ? "item-cards item d-flex flex-column align-items-center justify-content-between" : "item-cards item d-flex flex-column align-items-center inactive-shadow justify-content-between"}
                key={index}
                onClick={() => {
                    if (el.isActive && !project?.archived) {
                        setCatalogItem(el);
                    }
                }}
            >
                <div className="align-items-center d-flex image-container">
                    <img src={el.images[0]} />
                </div>
                <div className="item-bottom-sections">
                    <h4
                        className=""
                    >
                        {el.itemName} <br />{' '}
                        <span>{el.item_ID}</span><br />{' '}
                        {!el.isActive && (
                            <span>inactive</span>)}
                    </h4>
                </div>
            </div>
        ));

    useEffect(() => {
        (async () => {
            try {
                dispatch(getCatalogItems());
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <>
            <div className="d-flex row flex-wrap m-0 p-0">
                { }
                {loading ? (
                    <h2>Loading...</h2>
                ) : error ? (
                    <h2>Error fetching users</h2>
                ) : (
                    <>
                        <div className="lightCard items d-flex flex-wrap justify-content-center">
                            {filteredData?.length ? filteredData
                            :   <div className="main-catalog-filter-container d-flex m-0">
                                    <div className="col-12 d-flex row m-0 p-0">
                                        <h4 className="d-flex justify-content-center">
                                            No catalog items found.
                                        </h4>
                                    </div>
                                </div>
                            }
                        </div>

                    </>
                )}
            </div>
            {searchValue.length > 6 ? (
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
