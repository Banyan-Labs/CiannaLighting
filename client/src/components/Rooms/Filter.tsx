import React, { FC, useState, FormEvent } from 'react';

import { useAppDispatch } from '../../app/hooks';
import { filterCatalogItems } from '../../redux/actions/lightActions';
import { DesignStyle, UsePackage, StyleOption } from 'app/constants';

import './style/roomDetails.scss';

interface catalogPros {
    catalogItem: any;
    filterBar: any;
    setFilterBar: any;
}

const DetailsFilter: FC<catalogPros> = ({ filterBar, setFilterBar }) => {
    const dispatch = useAppDispatch();

    const [designStyle, setDesignStyle] = useState<string>('');

    const [styleOptions, setStyleOptions] = useState<string[]>([]);

    const [usePackages, setUsePackages] = useState<string[]>([]);

    const handleDesignInput = (e: any) => {
        setDesignStyle(
            e.target.selectedOptions[0].value
        );
    };
    const handleOptionsInput = (e: FormEvent<HTMLInputElement>) => {
        e.currentTarget.checked
            ? setStyleOptions([...styleOptions, e.currentTarget.name])
            : setStyleOptions(
                styleOptions.filter((x: any) => x !== e.currentTarget.name)
            );
    };
    const handlePackagesInput = (e: FormEvent<HTMLInputElement>) => {
        e.currentTarget.checked
            ? setUsePackages([...usePackages, e.currentTarget.name])
            : setUsePackages(
                usePackages.filter((x: any) => x !== e.currentTarget.name)
            );
    };
    const resetFilters = (e: any) => {
        e.preventDefault();

        setDesignStyle('');
        setStyleOptions([]);
        setUsePackages([]);
        dispatch(filterCatalogItems({}));
        setFilterBar(!filterBar);
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();

        try {
            dispatch(
                filterCatalogItems({
                    designStyle,
                    usePackages,
                    styleOptions,
                })
            );
        } catch (err: any) {
            throw new Error(err.message);
        }

        setFilterBar(!filterBar);
    };

    return (
        <div
            className={
                filterBar === true
                    ? 'container-filter container col-md-4 col-lg-3 col-xl-2 d-flex row align-content-start'
                    : 'd-none'
            }
        >
            <div className="d-flex col-12 top-filter m-0 p-0 justify-content-center align-items-center">
                <h3 className="m-0" style={{ color: '#3f3c39' }}>
                    Filters
                </h3>
            </div>

            <form
                onSubmit={onSubmit}
                className="filter-form-container row m-0 col-12 d-flex "
            >
                <div className="design-container d-flex row m-0 p-0">
                    <h5 className="m-0 p-0">Design Style</h5>
                    <select
                        className="d-flex m-0 align-items-center"
                        id="designStyles"
                        onChange={(e) => handleDesignInput(e)}
                        placeholder="Design Style"
                        name="designStyle"
                        value={designStyle || ''}
                    >
                        <option value="">
                            Any
                        </option>
                        {Object.values(DesignStyle).map(
                            (item: any, index: number) => (
                                <option
                                    key={index}
                                    value={item}
                                >
                                    {item}
                                </option>
                            )
                        )}
                    </select>
                    <h5 className="m-0 p-0">Style Options</h5>
                    {Object.values(StyleOption).map((option: any) => (
                        <div
                            className="d-flex m-0 align-items-center"
                            key={option}
                        >
                            <input
                                className="my-0"
                                type="checkBox"
                                name={option}
                                id="StyleOption"
                                checked={styleOptions.includes(option)}
                                onChange={(e) => handleOptionsInput(e)}
                            />
                            <p className="m-0">{option}</p>
                        </div>
                    ))}
                    <h5 className="m-0 p-0">Use Packages</h5>
                    {Object.values(UsePackage).map((usePackage: any) => (
                        <div
                            className="d-flex m-0 align-items-center"
                            key={usePackage}
                        >
                            <input
                                className="my-0"
                                type="checkBox"
                                name={usePackage}
                                id="UsePackage"
                                checked={usePackages.includes(usePackage)}
                                onChange={(e) => handlePackagesInput(e)}
                            />
                            <p className="m-0">{usePackage}</p>
                        </div>
                    ))}
                </div>
                <div className="d-flex button-container-filters mt-4">
                    <button className="reset mx-1" onClick={resetFilters}>
                        Reset
                    </button>
                    <button className="submit mx-1" type="submit">
                        Apply
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DetailsFilter;
