import React, { FC } from 'react';
import '../style/catalog.scss';
interface catalogPros {
    catalogItem: any;
}

const Details: FC<catalogPros> = ({ catalogItem }) => {
    const Item = catalogItem;

    return (
        <div className="col-12 d-flex row m-0 p-0 light_details">
            <div className="d-flex col-8 px-5 flex-column">
                <div className="light_details_container">
                    <div className="d-flex light_details_title">
                        <h4 className="col-4">Id:</h4>
                        <h4 className="col-8 light_details_info">
                            {Item.item_ID}
                        </h4>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <h4 className="d-flex light_details_title">Description:</h4>{' '}
                    <span className="ms-5 pb-2 light_details_info">
                        {Item?.itemDescription}
                    </span>
                </div>
            </div>
            <div className="d-flex col-4     flex-column">
                <div className="light_details_container">
                    <h4 className="light_details_title">Design Styles:</h4>
                    <ul className="light_details_info">
                        {Item?.designStyle[0]
                            .split(',')
                            .map((ef: string, index = ef.indexOf(ef)) => (
                                <li key={index}>{ef}</li>
                            ))}
                    </ul>
                </div>

                <div className="light_details_container">
                    <h4 className="light_details_title">Use Packages:</h4>
                    <ul className="light_details_info">
                        {Item?.usePackages[0]
                            .split(',')
                            .map((ef: string, index = ef.indexOf(ef)) => (
                                <li key={index}>{ef}</li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Details;
