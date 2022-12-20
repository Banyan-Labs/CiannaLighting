import React, { FC, useEffect, useState } from 'react';
import usePagination from './usePagination';
import { getCatalogItems } from '../../../redux/actions/lightActions';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';

interface searchBarProps {
    searchTerm: string;
    setCatalogItem: any;
}
const Cards: FC<searchBarProps> = ({ searchTerm, setCatalogItem }) => {
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
            <div className="lightCard d-flex row flex-wrap m-0 p-0">
                {loading ? (
                    <h2>Loading...</h2>
                ) : error ? (
                    <h2>Error fetching users</h2>
                ) : (
                    <>
                        <div className="items d-flex m-0 p-0 flex-wrap justify-content-center">
                            {setAllCatalog
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
                                        className="item d-flex row align-content-start"
                                        key={index}
                                        onClick={() => {
                                            setCatalogItem(el);
                                        }}
                                    >
                                        <img src={el.images[0]} />
                                        <div className="item-bottom-sections">
                                            <h4
                                                className=""
                                                style={{ minHeight: '75px' }}
                                            >
                                                {el.itemName} <br />{' '}
                                                <span>{el.item_ID}</span>
                                            </h4>
                                        </div>
                                    </div>
                                ))}
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
