import React from 'react';
import CollapsibleList from 'components/commons/ui/CollapsibleList';
import { CatalogItem } from 'typescript/CatalogItem';
import convertCsvInArray from 'helpers/convertCsvInArray';
import getLightSpecsFromItem from 'helpers/getLightSpecsFromItem';

type Props = {
    lightDetails: CatalogItem;
};

const LightSpecifications = ({ lightDetails }: Props) => {
    const packageList = convertCsvInArray(lightDetails.usePackages);
    const specificationList = getLightSpecsFromItem(lightDetails);

    return (
        <div style={{ padding: '0 16px' }}>
            <CollapsibleList
                title="Use Packages"
                width="100%"
                listItems={packageList}
            />
            <CollapsibleList
                title="Specifications"
                width="100%"
                listItems={specificationList}
            />
        </div>
    );
};

export default LightSpecifications;
