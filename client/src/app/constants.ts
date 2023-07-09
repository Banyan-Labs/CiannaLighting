export const ROLES = {
    User: '1212',
    Int: '9999',
    Cmd: '6677',
};

export const LIGHT_DISPLAY_SPECIFICATION_KEYS = [
    'bodyDiameter',
    'bodyHeight',
    'bodyLength',
    'bodyWidth',
    'sconceExtension',
    'sconceHeight',
    'sconceWidth',
    'socketQuantity',
    'fixtureOverallHeight',
    'lampColor',
    'lampType',
    'numberOfLamps',
    'wattsPerLamp',
    'powerInWatts',
    'lumens',
    'estimatedWeight',
    'material',
    'price',
];

export const LIGHT_FORM_OPTIONS_KEYS = [
    'acrylicOptions',
    'crystalPinColor',
    'crystalPinType',
    'crystalType',
    'glassOptions',
    'mounting',
    'socketType',
    'safetyCert',
    'environment',
    'interiorFinish',
    'exteriorFinish',
    'lensMaterial',
    'projectVoltage',
];

export enum ActionType {
    ADD = 1,
    REPLACE,
    DELETE
}

export enum AttachmentType {
    IMAGE = 'images',
    PDF = 'pdf',
    SPEC = 'specs',
    DRAWING_FILE = 'drawingFiles',
}

export enum CopyType {
    PROJECT = 1,
    ROOM
}
