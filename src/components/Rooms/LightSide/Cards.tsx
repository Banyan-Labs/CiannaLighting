import React, { FC, useEffect, useState } from 'react';
import usePagination from './usePagination';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { getCatalogItems } from '../../../redux/actions/lightActions';
import Default from '../../../assets/stairway.jpeg';

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
        <div className="lightCard d-flex row flex-wrap">
            {loading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h2>Error fetching users</h2>
            ) : (
                <>
                    <div className="items d-flex flex-wrap justify-content-center">
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
                                }
                            })
                            .slice(firstContentIndex, lastContentIndex)
                            .map((el: any, index: any) => (
                                <div
                                    className="item d-flex row align-content-start"
                                    key={index}
                                >
                                    <img
                                        src={Default}
                                        onClick={() => {
                                            setCatalogItem(el);
                                        }}
                                    />
                                    <div className="item-bottom-sections">
                                        <h4 className="">
                                            Acrylic Pendant <br />{' '}
                                            <span>{el.item_ID}</span>
                                        </h4>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {searchValue.length > 6 ? (
                        <div className="pagination">
                            <p className="text">
                                {page}/{totalPages}
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
                                    className={`page ${
                                        page === el ? 'active' : ''
                                    }`}
                                >
                                    {el}
                                </button>
                            ))}
                            {gaps.after ? '...' : null}
                            <button
                                onClick={() => setPage(totalPages)}
                                className={`page ${
                                    page === totalPages && 'disabled'
                                }`}
                            >
                                {totalPages}
                            </button>
                            <button
                                onClick={nextPage}
                                className={`page ${
                                    page === totalPages && 'disabled'
                                }`}
                            >
                                &rarr;
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                </>
            )}
        </div>
    );
};

export default Cards;
