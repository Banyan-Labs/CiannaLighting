import { Document } from "mongoose";

export interface Finish {
  exteriorFinish: string;
  interiorFinish: string;
  lensMaterial: string;
  glassOptions: string;
  acrylicOptions: string;
}

export interface Room {
    name: string;
    lightNumber: number;
}


export interface ProposalTableRow {
  sub: string;
  projectId: string;
  lightID: string;
  itemID: string; // changes on first insertion 
  description: string; // updates on first light insertion
  lampType: string; // changes on first light insertion
  lampColor: string; // changes first light insertion
  lightQuantity: number; // increases on each room
  price: number;
  wattsPer: number; // changes on first light insertion
  totalWatts: number; // increases with each "power in watts" coming in
  numberOfLamps: number // increases with each "number of lights"
  totalLumens: number; // increases with each light insertion
  finishes: Finish; // changes on first light insertion
  rooms: Room[]; // updates each time a room is added, and updates lightQuantity
  subTableRow: string[]; // fills in if secondary customization of light added with new copy
}
/**
 * make this into a new model,
 * create route that finds tableRow && subTableRow depending on Project ID every time that project is active. 
 * create redux state to hold the return information.
 * if new light is selected, do a frontend check against redux, comparing itemID, if one is there send _id
 * if _id comes through with info make a new one &! ( update the info in the one with the _id (Proposal)  (rooms, subTableRow gets _id of new el, lightQuantity, totalWatts, totalLumens ))
 * if it does not then rfpDoc foundBy ProjectID gets the new _id assigned to the tableRow array
 * 
 */

export default interface rfpDocInterface extends Document {
  header: string; // project name && creates rfp
  projectId: string; //projectId
  clientId: string;
  clientName: string; 
  tableRow:  string[];
}
