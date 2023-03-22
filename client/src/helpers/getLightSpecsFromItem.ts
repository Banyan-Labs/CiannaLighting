import { CatalogLightItem, LightSpecs } from 'typescript/CatalogItem';
import { LIGHT_DISPLAY_SPECIFICATION_KEYS as specKeys } from 'app/constants';

type T = { key: string; value: string | number };

/**
 * @function getLightSpecsFromItem
 * @description This function is used to get the light specifications from a catalog item
 * @param {CatalogLightItem} lightItem required
 * @returns {Array<T>}
 * @example { lightColor: 'red', ...lightItem } => [ { key: 'Light Color', value: 'red' } ]
 */
export default (lightItem: CatalogLightItem): T[] => {
    const results = [];
    for (const key in lightItem) {
        if (specKeys.includes(key)) {
            const label = key
                .replace(/([A-Z])/g, (match) => ' ' + match)
                .replace(/^[a-z]/, (match) => match.toUpperCase());
            results.push({
                key: label,
                value: lightItem[key as keyof LightSpecs],
            });
        }
    }
    return results;
};
