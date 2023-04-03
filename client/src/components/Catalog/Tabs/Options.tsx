import React, { FC } from 'react';
import uuid from 'react-uuid';
import '../style/catalog.scss';
interface catalogPros {
    catalogItem: any;
}

const Options: FC<catalogPros> = ({ catalogItem }) => {
    const ItemValues = Object.entries(catalogItem);

    return (
        <div className="col-12 d-flex row m-0 p-0 options_container">
            {ItemValues?.map((item: any, index: number) => {
                if (index > 22 && index < 29)
                    return (
                        <div className="d-flex col-6 flex-column align-items-center" key={uuid()}>
                            <h4 className="col-6 m-0 p-0" key={uuid()}>
                                {item[0]
                                    .split(/(?=[A-Z])/)
                                    .join(' ')
                                    .toUpperCase()}
                                :
                            </h4>
                            <ul className="col-4 p-0 mt-1">
                                {item[1]
                                    .join('')
                                    .split(',')
                                    .map((val: any) => (
                                        <li className="" key={uuid()}>
                                            {val}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    );
                else if (index >= 29 && index < 36)
                    return (
                        <div className="d-flex col-6 flex-column align-items-center" key={uuid()}>
                            <h4 className="col-6 m-0 p-0" key={uuid()}>
                                {item[0]
                                    .split(/(?=[A-Z])/)
                                    .join(' ')
                                    .toUpperCase()}
                            </h4>
                            <ul className="col-4 p-0 mt-1">
                                {item[1]
                                    .join('')
                                    .split(',')
                                    .map((val: any) => (
                                        <li key={uuid()}>{val}</li>
                                    ))}
                            </ul>
                        </div>
                    );
            })}
        </div>
    );
};

export default Options;
