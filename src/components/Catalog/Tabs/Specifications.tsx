import React, { FC } from 'react';
import '../style/catalog.scss';
interface catalogPros {
    catalogItem: any;
    setCatalogItem: any;
}

const specifications: FC<catalogPros> = ({
    catalogItem,
    setCatalogItem,
}) => {
    const Item = catalogItem
    return (
        <div className='col-12 d-flex row specifications-main-container m-0'>
           <div className="d-flex col-12 row  justify-content-end m-0">
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Body Diameter</p>
                                <p className="p-0 m-0 number-spec">
                                    {Item?.bodyDiameter}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Body Length</p>
                                <p className="p-0 m-0 number-spec">
                                    {Item?.bodyLength}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Body Width</p>
                                <p className="p-0 m-0 number-spec">
                                    {Item?.bodyWidth}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Body Height</p>
                                <p className="p-0 m-0 number-spec">
                                    {Item?.bodyHeight}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Fixture Height</p>
                                <p className="p-0 m-0 number-spec">
                                    {Item?.fixtureOverallHeight}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Sconce Height</p>
                                <p className="p-0 m-0 number-spec">
                                    {Item?.sconceHeight}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Sconce Width</p>
                                <p className="p-0 m-0 number-spec">
                                    {Item?.sconceWidth}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Sconce Extension</p>
                                <p className="p-0 m-0 number-spec">
                                    {Item?.sconceExtension}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Socket Quantity</p>
                                <p className="p-0 m-0 number-spec">
                                    {Item?.socketQuantity}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Power In Watts</p>
                                <p className="p-0 m-0 number-spec">
                                    {Item?.powerInWatts}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Estimated Weight</p>
                                <p className="p-0 m-0 number-spec">
                                    {Item?.estimatedWeight}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Price</p>
                                <p className="p-0 m-0 number-spec">
                                    {Item?.price}$
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Material</p>
                                <p className="p-0 m-0 number-spec">
                                    {Item?.material}
                                </p>
                            </div>
                        </div>
        </div>
    );
};

export default specifications;