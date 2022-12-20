import React, { FC, useState, FormEvent } from 'react';
import { FaSlidersH } from 'react-icons/fa';
import './style/roomDetails.scss';
import { useAppDispatch } from '../../app/hooks';
import { filterCatalogItems } from '../../redux/actions/lightActions';

interface catalogPros {
    catalogItem: any;
    filterBar: any;
    setFilterBar: any;
}

const DetailsFilter: FC<catalogPros> = ({
    catalogItem,
    filterBar,
    setFilterBar,
}) => {
    const dispatch = useAppDispatch();

    const [designDetails, setDesignDetails] = useState<any>({
        asian: '',
        artDeco: '',
        colonial: '',
        western: '',
        traditional: '',
        transitional: '',
    });

    const [packageDetails, setPackageDetails] = useState<any>({
        baptistry: '',
        bridesRoom: '',
        celestialRoom: '',
        hallway: '',
        forier: '',
    });

    const handleDesignInput = (e: FormEvent<HTMLInputElement>) => {
        setDesignDetails({
            ...designDetails,
            [e.currentTarget.name]:
                e.currentTarget.checked === true ? e.currentTarget.name : '',
        });
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

        const designs = Object.values(designDetails).filter((x: any) =>
            x.toLowerCase()
        );
        const packages = Object.values(packageDetails).filter((x: any) =>
            x.toLowerCase()
        );

        console.log(designs, packages);

        try {
            dispatch(
                filterCatalogItems({
                    designStyle: designs,
                    usePackages: packages,
                })
            );

            setDesignDetails({
                asian: '',
                artDeco: '',
                colonial: '',
                western: '',
                traditional: '',
                transitional: '',
            });
            setPackageDetails({
                baptistry: '',
                bridesRoom: '',
                celestialRoom: '',
                hallway: '',
                forier: '',
            });
        } catch (err) {
            console.log('Error: ' + err);
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
                    ? 'container-filter container col-md-4 col-lg-3 col-xl-2 d-flex row m-0 p-0 align-content-start'
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
                    <div className="input-container-filter">
                        <div className="d-flex m-0">
                            <input
                                className="m-1"
                                type="checkBox"
                                name="asian"
                                id="designStyles"
                                onChange={(e) => handleDesignInput(e)}
                            />
                            <p className="m-1">Asian</p>
                        </div>
                        <div className="d-flex m-0">
                            <input
                                className="m-1"
                                type="checkBox"
                                name="art-deco"
                                id="designStyles"
                                onChange={(e) => handleDesignInput(e)}
                            />
                            <p className="m-1">Art Deco</p>
                        </div>
                        <div className="d-flex m-0">
                            <input
                                className="m-1"
                                type="checkBox"
                                name="colonial"
                                id="designStyles"
                                onChange={(e) => handleDesignInput(e)}
                            />
                            <p className="m-1">Colonial</p>
                        </div>
                        <div className="d-flex m-0">
                            <input
                                className="m-1"
                                type="checkBox"
                                name="western"
                                id="designStyles"
                                onChange={(e) => handleDesignInput(e)}
                            />
                            <p className="m-1">Western</p>
                        </div>
                        <div className="d-flex m-0">
                            <input
                                className="m-1"
                                type="checkBox"
                                name="traditional"
                                id="designStyles"
                                onChange={(e) => handleDesignInput(e)}
                            />
                            <p className="m-1">Traditional</p>
                        </div>
                        <div className="d-flex m-0">
                            <input
                                className="m-1"
                                type="checkBox"
                                name="transitional"
                                id="designStyles"
                                onChange={(e) => handleDesignInput(e)}
                            />
                            <p className="m-1">Transitional</p>
                        </div>
                    </div>
                    <div className="design-container d-flex row m-0 p-0">
                        <h5 className="m-0 p-0">Use Packages</h5>
                        <div className="input-container-filter">
                            <div className="d-flex m-0">
                                <input
                                    className="m-1"
                                    type="checkBox"
                                    name="baptistry"
                                    id="usePackages"
                                    onChange={(e) => handlePackagesInput(e)}
                                />
                                <p className="m-1">Baptistry</p>
                            </div>
                            <div className="d-flex m-0">
                                <input
                                    className="m-1"
                                    type="checkBox"
                                    name="bridesRoom"
                                    id="usePackages"
                                    onChange={(e) => handlePackagesInput(e)}
                                />
                                <p className="m-1">Brides Room</p>
                            </div>
                            <div className="d-flex m-0">
                                <input
                                    className="m-1"
                                    type="checkBox"
                                    name="celestialRoom"
                                    id="usePackages"
                                    onChange={(e) => handlePackagesInput(e)}
                                />
                                <p className="m-1">Celestial Room</p>
                            </div>
                            <div className="d-flex m-0">
                                <input
                                    className="m-1"
                                    type="checkBox"
                                    name="hallway"
                                    id="usePackages"
                                    onChange={(e) => handlePackagesInput(e)}
                                />
                                <p className="m-1">Hallway</p>
                            </div>
                            <div className="d-flex m-0">
                                <input
                                    className="m-1"
                                    type="checkBox"
                                    name="forier"
                                    id="usePackages"
                                    onChange={(e) => handlePackagesInput(e)}
                                />
                                <p className="m-1">Forier</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 d-flex row button-container-filters">
                    <button>Apply Filters</button>
                </div>
            </form>
        </div>
    );
};

export default DetailsFilter;
