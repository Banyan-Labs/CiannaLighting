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
    'lumens',
    'estimatedWeight',
    'material',
    'price',
];

export const LIGHT_FORM_OPTIONS_KEYS = [
    'crystalPinColor',
    'crystalType',
    'treatment',
    'cystalBulbCover',
    'mounting',
    'socketType',
    'safetyCert',
    'environment',
    'interiorFinish',
    'exteriorFinish',
    'finishTreatment',
    'lensMaterial',
    'projectVoltage',
];

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
    TRANSITIONAL: 'Transitional',
    TRADITIONAL: 'Traditional',
    COLONIAL: 'Colonial',
    CONTEMPORARY: 'Contemporary',
    ASIAN: 'Asian',
    ART_DECO: 'Art Deco',
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

export const LampColors = [
    '2700K',
    '3000K',
];

export const ProjectVoltages = [
    '120V',
    '220V'
];

export const SocketTypes = [
    'E12',
    'E26',
    'E14',
    'E26',
    'E27'
];

export const Materials = [
    'Brass',
    'Steel'
];

export const ExteriorFinishes = [
    'Ciana Bronze',
    'Ciana Brass',
    'Polished Silver',
    'Polished Chrome'
];

export const FinishTreatments = [
    'Satin',
    'Brushed',
    'Antiqued'
];

export const InteriorFinishes = [
    'Match finish color',
    'Polished Chrome'
];

export const LensMaterials = [
    'Glass - Clear',
    'Glass - Seedy',
    'Glass - White',
    'Acrylic - Clear White Alabaster Acrylic',
    'Acrylic - Milky White Acrylic N425 ',
    'Acrylic - Milky White Acrylic N514'
];

export const Treatments = [
    'No Frost',
    'Outside only frost',
    'Inside only frost',
    'Both sides frost',
    'Carved Design - as specified',
];

export const CrystalTypes = [
    'NA',
    'Asfour (30% Lead)',
    'Empire (7% Lead)'
];

export const CrystalPinColors = [
    'NA',
    'Gold',
    'Silver',
    'Match exterior finish color, as close as possible'
];

export const CrystalBulbCovers = [
    'NA',
    'Yes',
    'No',
];

export const Environments = [
    'Interior',
    'Exterior'
];

export const SafetyCertifications = [
    'UL',
    'CE',
    'SEC',
    'ETL',
];

export const MountingTypes = [
    'Flat',
    'Slope',
    'Hoist',
    'J-Box',
    'Lag bolts',
];
