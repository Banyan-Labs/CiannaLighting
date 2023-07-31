import { LightItemType } from 'typescript/CatalogItem';

export const validateInstanceOfLightItemType = (obj: {
    [key: string]: string | number;
}): obj is LightItemType => (obj as LightItemType).item_ID !== undefined;

export const parseFileName = (filename: string) => {
    const fieldNames = ['renderings', 'cutSheets', 'drawingFiles'];

    let itemId = '';
    let fieldName = '';
    let originalName = '';

    for (let i = 0; i < fieldNames.length; i++) {
        if (filename.includes(`-${fieldNames[i]}-`)) {
            fieldName = fieldNames[i];
            const parts = filename.split(`-${fieldName}-`);
            itemId = parts[0];
            originalName = parts[1];

            break;
        }
    }

    return {
        itemId: itemId,
        fieldName: fieldName,
        originalName: originalName
    };
}
