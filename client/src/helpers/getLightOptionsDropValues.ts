import {
    CatalogLightItem,
    LightItemType,
    LightOptions,
} from 'typescript/CatalogItem';
import { LIGHT_FORM_OPTIONS_KEYS } from 'app/constants';

type T = {
    label: string;
    key: string;
    values: string[];
};

/**
 * @function getDefaultDropValueFromLightEntity
 * @param {LightItemType} lightItem
 * @param {String} propertyKey
 * @returns {String}
 * @example ({ lightColor: 'red', ...lightItem }, 'lightColor') => 'red'
 */
export const getDefaultDropValueFromLightEntity = (
    lightItem: LightItemType,
    propertyKey: string
): string => lightItem[propertyKey as keyof LightItemType] as string;

/**
 * @function getLightOptionsDropValuesFromItem
 * @param {CatalogLightItem} light
 * @returns {Array<T>}
 * @example { lightColor: ['red', 'green'], ...lightItem } => [ { label: 'Light Color', key: 'lightColor', values: ['red', 'green'] } ]
 */
export const getLightOptionsDropValuesFromItem = (
    lightItem: CatalogLightItem
): T[] => {
    const results = [];

    for (const key in lightItem) {
        if (LIGHT_FORM_OPTIONS_KEYS.includes(key)) {
            const label = key
                .replace(/([A-Z])/g, (match) => ' ' + match)
                .replace(/^[a-z]/, (match) => match.toUpperCase());
            const values = lightItem[key as keyof LightOptions];

            results.push({ label, key, values });
        }
    }
    
    return results;
};
