export type LightDetails = {
    name: string; //* added after typing CatalogItem.tsx, might be redundant key for `itemName` from API
    costAdmin: number;
    designStyle: string[];
    drawingFiles: string[];
    employeeID: string;
    images: string[];
    isActive: boolean;
    itemDescription: string;
    itemName: string;
    item_ID: string;
    partnerCodeAdmin: string;
    pdf: string[];
    specs: string[];
    usePackages: string[];
};

export type LightOptions = {
    acrylicOptions: string[];
    crystalPinColor: string[];
    crystalPinType: string[];
    crystalType: string[];
    glassOptions: string[];
    mounting: string[];
    socketType: string[];
    safetyCert: string[];
    environment: string[];
    interiorFinish: string[];
    exteriorFinish: string[];
    lensMaterial: string[];
    projectVoltage: string[];
};

export type LightSpecs = {
    bodyDiameter: string;
    bodyHeight: string;
    bodyLength: string;
    bodyWidth: string;
    sconceExtension: string;
    sconceHeight: string;
    sconceWidth: string;
    socketQuantity: number;
    fixtureOverallHeight: string;
    lampColor: string;
    lampType: string;
    numberOfLamps: string; //* should this be a number?
    wattsPerLamp: string; //* should this be a number?
    powerInWatts: number;
    lumens: string; //* should this be a number?
    estimatedWeight: number;
    price: number;
    material: string;
};

export interface CatalogItem extends LightDetails, LightSpecs, LightOptions {}
