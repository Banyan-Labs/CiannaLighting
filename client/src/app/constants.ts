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
    RENDERING = 'renderings',
    CUT_SHEET = 'cutSheets',
    DRAWING_FILE = 'drawingFiles',
}

export enum CopyType {
    PROJECT = 1,
    ROOM
}

export const SystemStatus = [
    'Configure / Design',
    'RFP / Completed',
    'Saved Projects',
    'On Hold',
    'Template / New'
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
    LOBBY: 'Lobby',
    LOBBY_ALTERNATE: 'Lobby Alternate',
    BAPTISTRY: 'Baptistry',
    ENDOWMENT: 'Endowment',
    SEALING: 'Sealing',
    CELESTIAL: 'Celestial',
    GENERAL: 'General',
    VEIL_CORRIDOR: 'Veil Corridor'
};
