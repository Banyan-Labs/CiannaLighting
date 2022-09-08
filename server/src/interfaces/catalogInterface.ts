import { Document } from "mongoose";

export default interface catalogInterface extends Document {
  item_ID: string;
  itemDescription: string;
  exteriorFinish: string[];
  interiorFinish: string[];
  lensMaterial: string[];
  glassOptions: string[];
  acrylicOptions: string[];
  environment: string[];
  safetyCert: string[];
  projecVoltage: string[];
  socketType: string[];
  mounting: string[];
  crystalType: string[];
  designStyle: string[];
  usePackages: string[];
  bodyDiameter: string;
  bodyLength: string;
  bodyWidth: string;
  bodyHeight: string;
  fixtureOverallHeight: string;
  sconceHeight: string;
  sconceWidth: string;
  sconceExtension: string;
  socketQuantity: number;
  powerInWatts: number;
  estimatedWeight: number;
  price: number;
  material: string;
  images: string[];
  PDF: string[];
  drawingFiles: string[];
  costAdmin: number;
  partnerCodeAdmin: string;
}
// image stored in an s3 bucket
// costAdmin and partnerCodeAdmin only viewable to admin

// {
// XXX acrylicOptions: "Frosted"
// bodyDiameter: "93cm"
// bodyHeight: "71\""
// bodyLength: "120in"
// costAdmin: 12.44
// XXX crystalPinColor: "Silver"
// XXX crystalPinType: "Bowtie"
// XXX crystalType: "30% Pb"
// XXX designStyle: "Transitional"
// XXX environment: "Damp"
// estimatedWeight: 57.05
// XXX exteriorFinish: "Brushed Brass" 
// fixtureOverallHeight: "120in"
// XXX glassOptions: "Seeded"
// image: "http://dummyimage.com/223x100.png/ff4444/ffffff"
// interiorFinish: "Polished Chrome"
// XXX interior_Finish: "Fuscia"
// itemDescription: "donec semper sapien a libero nam dui proin leo odio porttitor id consequat"
// item_ID: "AD-107"
// XXX lensMaterial: "cystal"
// material: "Vinyl"
// XXX mounting: "Hoist"
// partnerCodeAdmin: "Kanya"
// powerInWatts: 66.5
// price: 57.76
// XXX projectVoltage: "120Vac"
// XXX safetyCert: "UL/ETL"
// sconceExtension: "93\""
// sconceHeight: "93\""
// sconceWidth: "93\""
// socketQuantity: 1
// XXX socketType: "E12"
// XXX usePackages: "Brides Room"
// }