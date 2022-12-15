import React, { FC } from 'react';
import './style/design-styles.scss';
import { useAppDispatch } from '../../../app/hooks';
import { filterCatalogItems } from '../../../redux/actions/lightActions';

const designStylesData = [
    'Art-deco',
    'Western',
    'Native',
    'Asian',
    'Transitional',
    'Traditional',
];

interface catalogPros {
    catalogType: any;
    setCatalogType: any;
    setRenderPage: any;
    renderPage: any;
}

const DesignStyles: FC<catalogPros> = ({
    catalogType,
    setCatalogType,
    setRenderPage,
    renderPage,
}) => {
    const dispatch = useAppDispatch();

    const fetchData1 = async (e: any) => {
        const value = e.currentTarget.value.toLowerCase();
        dispatch(
            filterCatalogItems({
                designStyle: [value],
            })
        );
    };

    const designStyles = designStylesData.map((style) => {
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
                <div className="catalog-design-styles-buttons">
                    {designStyles}
                </div>
                <div className="catalog-design-styles-divider" />
            </div>
        </>
    );
};

export default DesignStyles;
