export const ROLES = {
    User: '1212',
    Employee: '9999',
    Admin: '6677',
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

export const SystemStatus = [
    'New',
    'RFP',
    'Complete',
    'Hold',
    'Design',
    'Internal',
    'Awarded',
    'Canceled'
];

export const DesignStyle = {
    ART_DECO: 'Art Deco',
    WESTERN: 'Western',
    NATIVE: 'Native',
    ASIAN: 'Asian',
    TRADITIONAL: 'Traditional',
    TRANSITIONAL: 'Transitional'
};

export const UsePackage: Record<string, string> = {
    BRIDES_ROOM: 'Bride\'s Room',
    CELESTIAL_ROOM: 'Celestial Room',
    BAPTISTRY: 'Baptistry',
    HALLWAY: 'Hallway',
    FOYER: 'Foyer', 
    BALLROOM: 'Ballroom',
};
