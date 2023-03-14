import React from 'react';
import SelectDropdown from 'components/commons/ui/SelectDropdown';
import {
    CatalogLightItem,
    LightOptions,
    LightItemType,
} from 'typescript/CatalogItem';
import { LIGHT_FORM_OPTIONS_KEYS } from 'app/constants';
import uuid from 'react-uuid';

type Props = {
    catalogLightItem: CatalogLightItem;
    editLightItem: LightItemType | null;
};

function LightOptionsForm({ catalogLightItem, editLightItem }: Props) {
    const getLightOptionsDropValuesFromItem = (
        light: CatalogLightItem
    ): {
        label: string;
        key: string;
        values: string[];
    }[] => {
        const results = [];
        for (const key in light) {
            if (LIGHT_FORM_OPTIONS_KEYS.includes(key)) {
                const label = key
                    .replace(/([A-Z])/g, (match) => ' ' + match)
                    .replace(/^[a-z]/, (match) => match.toUpperCase());
                const values = light[key as keyof LightOptions];
                results.push({ label, key, values });
            }
        }
        return results;
    };

    const getDefaultDropValueFromLightEntity = (
        lightItem: LightItemType,
        propertyKey: string
    ): string => lightItem[propertyKey as keyof LightItemType].toString();

    const InputElements = getLightOptionsDropValuesFromItem(
        catalogLightItem
    ).map((selectField) => {
        return (
            <SelectDropdown
                key={uuid()}
                itemKey={selectField.key}
                label={selectField.label}
                dropdownValues={selectField.values}
                defaultValue={
                    editLightItem !== null
                        ? getDefaultDropValueFromLightEntity(
                              editLightItem,
                              selectField.key
                          )
                        : selectField.values[0]
                }
            />
        );
    });

    return <form>{InputElements}</form>;
}

export default LightOptionsForm;
