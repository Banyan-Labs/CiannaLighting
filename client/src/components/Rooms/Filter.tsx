import React, { FC, useState, FormEvent } from 'react';

import { useAppDispatch } from '../../app/hooks';
import { filterCatalogItems } from '../../redux/actions/lightActions';
import { DesignStyle, UsePackage } from 'app/constants';

import './style/roomDetails.scss';

interface catalogPros {
    catalogItem: any;
    filterBar: any;
    setFilterBar: any;
}

const DetailsFilter: FC<catalogPros> = ({
    filterBar,
    setFilterBar,
}) => {
    const dispatch = useAppDispatch();

    const [designDetails, setDesignDetails] = useState<string>("");

    const [packageDetails, setPackageDetails] = useState<any>({
        baptistry: '',
        bridesRoom: '',
        celestialRoom: '',
        hallway: '',
        forier: '',
    });

    const handleDesignInput = (e: FormEvent<HTMLInputElement>) => {
        setDesignDetails( e.currentTarget.checked === true ? e.currentTarget.name : '' );
    };
    const handlePackagesInput = (e: FormEvent<HTMLInputElement>) => {
        setPackageDetails({
            ...packageDetails,
            [e.currentTarget.name]:
                e.currentTarget.checked === true ? e.currentTarget.name : '',
        });
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();

        const packages = Object.values(packageDetails).filter((x: any) =>
            x.toLowerCase()
        );

        try {
            dispatch(
                filterCatalogItems({
                    designStyle: [designDetails],
                    UsePackage: packages,
                })
            );

            setDesignDetails('');
            setPackageDetails({
                baptistry: '',
                bridesRoom: '',
                celestialRoom: '',
                hallway: '',
                forier: '',
            });
        } catch (err: any) {
            throw new Error(err.message);
        }

        const inputs = document.getElementsByTagName('input');

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].type == 'checkbox') {
                inputs[i].checked = false;
            }
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
                    <h5 className="m-0 p-0">Design Styles</h5>
                    <form className="input-container-filter">
                        {
                            Object.values(DesignStyle).map((design: any) => (
                                <div className="d-flex m-0" key={design.length}>
                                    <input
                                        className="m-1"
                                        type="radio"
                                        name={design}
                                        id="designStyles"
                                        checked={designDetails === design}
                                        onChange={(e) => handleDesignInput(e)}
                                    />
                                    <p className="m-1">{design}</p>
                                </div>
                            ))
                        }
                    </form>
                    <div className="design-container d-flex row m-0 p-0">
                        <h5 className="m-0 p-0">Use Packages</h5>
                        {
                            Object.values(UsePackage).map((usePackage: any) => (
                                <div className="d-flex m-0" key={usePackage.length}>
                                    <input
                                        className="m-1"
                                        type="checkBox"
                                        name={usePackage}
                                        id="UsePackage"
                                        onChange={(e) => handlePackagesInput(e)}
                                    />
                                    <p className="m-1">{usePackage}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="d-flex button-container-filters mt-4">
                    <button>Apply</button>
                </div>
            </form>
        </div>
    );
};

export default DetailsFilter;
