import React, { FC } from 'react';
import './style/design-styles.scss';
import { useAppDispatch } from '../../../app/hooks';
import { filterCatalogItems } from '../../../redux/actions/lightActions';
import { DesignStyle } from 'app/constants';

interface catalogPros {
    catalogType: any;
    setCatalogType: any;
    setRenderPage: any;
    renderPage: any;
    resultsRef: any;
}

const DesignStyles: FC<catalogPros> = ({
    setCatalogType,
    setRenderPage,
    resultsRef,
}) => {
    const dispatch = useAppDispatch();

    const fetchData1 = async (e: any) => {
        dispatch(
            filterCatalogItems({
                designStyle: e.currentTarget.value,
            })
        );

        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const designStyles = Object.values(DesignStyle).map((style) => {
        return (
            <div className="design-style-buttons-container" key={style}>
                <button
                    onClick={(e) => {
                        fetchData1(e);
                        setCatalogType(style);
                        setRenderPage('designStyle');
                    }}
                    value={style}
                    className="design-style-button"
                >
                    {style}
                </button>
            </div>
        );
    });

    return (
        <>
            <div className="catalog-design-styles">
                <span>Design Styles</span>
                <div className="catalog-design-styles-buttons mb-4 mt-5">
                    {designStyles}
                </div>
                <div className="catalog-design-styles-divider" />
            </div>
        </>
    );
};

export default DesignStyles;
