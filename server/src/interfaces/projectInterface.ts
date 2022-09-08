import { Document } from "mongoose";
import rfpDocInterface from "./rfpDocInterface";


export default interface projectInterface extends Document {
  name: string;
  clientId: string;
  clientName: string;
  region: string;
  status: string;
  description: string;
  rfp: rfpDocInterface;
  rooms: string[];
}

// In project I think include designer, region, status, and rfp. And under rfp reference the rfpInterface[].