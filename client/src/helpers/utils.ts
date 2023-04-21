import { LightItemType } from 'typescript/CatalogItem';

export const validateInstanceOfLightItemType = (obj: {
    [key: string]: string | number;
}): obj is LightItemType => (obj as LightItemType).item_ID !== undefined;
