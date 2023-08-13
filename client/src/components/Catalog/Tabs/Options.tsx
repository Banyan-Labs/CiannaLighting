import { camelCaseToTitleCase } from 'app/utils';
import React, { FC } from 'react';
import '../style/catalog.scss';
interface catalogPros {
    catalogItem: any;
}

const Options: FC<catalogPros> = ({ catalogItem }) => {
    const keys = Object.keys(catalogItem);
    const detailsFields = [
        'item_ID',
        'designStyle',
        'itemDescription',
        'usePackages'
    ];
    const specFields = [
        'bodyDiameter',
        'bodyHeight',
        'bodyWidth',
        'bodyLength',
        'fixtureOverallHeight',
        'sconceHeight',
        'sconceWidth',
        'sconceExtension',
        'estimatedWeight',
        'socketQuantity',
        'lumens',
    ];
    const attachmentFields = [
        'images',
        'renderings',
        'cutSheets',
        'drawingFiles',
    ];
    const unusedFields = [
        '_id',
        'employeeID',
        'costAdmin',
        'partnerCodeAdmin',
        '__v',
        'isActive'
    ];
    const fieldsToIgnore = [
        ...detailsFields,
        ...specFields,
        ...attachmentFields,
        ...unusedFields,
    ];

    return (
        <div className="d-flex flex-shrink-0 flex-wrap light_details px-3 mb-3">
            {keys?.map((key: any, index: number) => {
                if (fieldsToIgnore.includes(key)) return null;
                const item = catalogItem[key];

                return (
                    <div className="col-6" key={index + key}>
                        <h4 className="light_details_title">{camelCaseToTitleCase(key)}</h4>
                        <p className="light_details_info">
                            {item}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default Options;
