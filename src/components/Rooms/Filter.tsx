import React, { FC } from 'react';
import './style/roomDetails.scss';
import { FaSlidersH } from 'react-icons/fa';

interface catalogPros {
    catalogItem: any;
}

const DetailsFilter: FC<catalogPros> = ({ catalogItem }) => {
    return (
        <div
            className={
                catalogItem === null
                    ? 'container-filter container col-md-2 d-flex row m-0 p-0 align-content-start'
                    : 'd-none'
            }
        >
            <div className="d-flex col-12 top-filter m-0 p-0 justify-content-between align-items-center">
                <h3 className="m-0">Filters</h3>
                <FaSlidersH className="dashboard-all-projects-submit" />
            </div>
            <form className="filter-form-container row m-0 col-12 d-flex ">
                <div className="design-container d-flex row m-0 p-0">
                    <h5 className="m-0 p-0">Design Styles</h5>
                    <div className="input-container-filter">
                        <div className="d-flex m-0">
                            <input
                                className="m-1"
                                type="checkBox"
                                name=""
                                id=""
                            />
                            <p className="m-1">Asian</p>
                        </div>
                        <div className="d-flex m-0">
                            <input
                                className="m-1"
                                type="checkBox"
                                name=""
                                id=""
                            />
                            <p className="m-1">Art Deco</p>
                        </div>
                        <div className="d-flex m-0">
                            <input
                                className="m-1"
                                type="checkBox"
                                name=""
                                id=""
                            />
                            <p className="m-1">Colonial</p>
                        </div>
                        <div className="d-flex m-0">
                            <input
                                className="m-1"
                                type="checkBox"
                                name=""
                                id=""
                            />
                            <p className="m-1">Contemporary</p>
                        </div>
                        <div className="d-flex m-0">
                            <input
                                className="m-1"
                                type="checkBox"
                                name=""
                                id=""
                            />
                            <p className="m-1">Traditional</p>
                        </div>
                        <div className="d-flex m-0">
                            <input
                                className="m-1"
                                type="checkBox"
                                name=""
                                id=""
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
                                    name=""
                                    id=""
                                />
                                <p className="m-1">Baptistry</p>
                            </div>
                            <div className="d-flex m-0">
                                <input
                                    className="m-1"
                                    type="checkBox"
                                    name=""
                                    id=""
                                />
                                <p className="m-1">Brides Room</p>
                            </div>
                            <div className="d-flex m-0">
                                <input
                                    className="m-1"
                                    type="checkBox"
                                    name=""
                                    id=""
                                />
                                <p className="m-1">Celestial Room</p>
                            </div>
                            <div className="d-flex m-0">
                                <input
                                    className="m-1"
                                    type="checkBox"
                                    name=""
                                    id=""
                                />
                                <p className="m-1">Hallway</p>
                            </div>
                            <div className="d-flex m-0">
                                <input
                                    className="m-1"
                                    type="checkBox"
                                    name=""
                                    id=""
                                />
                                <p className="m-1">StairWay</p>
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
