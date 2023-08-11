export type LightDetails = {
    costAdmin: number;
    designStyle: string;
    drawingFiles: string[];
    employeeID: string;
    images: string[];
    isActive: boolean;
    itemDescription: string;
    item_ID: string;
    partnerCodeAdmin: string;
    pdf: string[];
    cutSheet: string[];
    usePackages: string[];
};

export type LightOptions = {
    safetyCert: string[];
    environment: string[];
    mounting: string[];
    crystalPinColor: string;
    crystalType: string;
    crystalBulbCover: string;
    treatment: string;
    socketType: string;
    interiorFinish: string;
    exteriorFinish: string;
    finishTreatment: string;
    lensMaterial: string;
    projectVoltage: string;
    designStyle: string;
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
    lumens: string; //* should this be a number?
    estimatedWeight: number;
    price: number;
    material: string;
};

export interface CatalogLightItem
    extends LightDetails,
        LightSpecs,
        LightOptions {}

/**
 * * Below type is being used for as typing for a light created and assigned to room from catalog item
 * TODO: look at refactoring this to extend types for Catalog Item
 */
export type LightItemType = {
    _id?: string;
    exteriorFinish: string;
    finishTreatment: string;
    interiorFinish: string;
    environment: string;
    safetyCert: string;
    projectVoltage: string;
    socketType: string;
    lensMaterial: string;
    crystalType: string;
    treatment: string;
    crystalBulbCover: string;
    crystalPinColor: string;
    mounting: string;
    item_ID: string;
    roomName: string;
    roomId: string;
    projectId: string;
    clientId: string;
    quantity: number;
};
