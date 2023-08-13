import React, { FC } from 'react';
import '../style/catalog.scss';
interface catalogPros {
    catalogItem: any;
}

const Details: FC<catalogPros> = ({ catalogItem }) => {
    const Item = catalogItem;

    return (
        <div className="d-flex flex-shrink-0 flex-wrap light_details px-3 mb-3">
            <div className="col-6">
                <h4 className="light_details_title">ID</h4>
                <p className="light_details_info">
                    {Item.item_ID}
                </p>
            </div>
            <div className="col-6">
                <h4 className="light_details_title">Design Style</h4>
                <p className="light_details_info">
                    {Item?.designStyle}
                </p>
            </div>
            <div className="col-6">
                <h4 className="light_details_title">Description</h4>
                {
                    Item?.itemDescription.split('\n').map((p: string, index: number) => (
                        <p className="light_details_info p-0 m-0" key={index + p}>{p}</p>
                    ))
                }
            </div>
            <div className="col-6">
                <h4 className="light_details_title">Use Packages</h4>
                <p className="light_details_info">
                    {Item?.usePackages?.join(', ')}
                </p>
            </div>
        </div>
    );
};

export default Details;
