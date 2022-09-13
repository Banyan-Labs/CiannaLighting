import { Document } from "mongoose";
import rfpDocInterface from "./rfpDocInterface";


export default interface projectInterface extends Document {
  name: string;
  clientId: string;
  clientName: string;
  region: string;
  status: string;
  description: string;
  rooms: string[];
}
// rfp: rfpDocInterface;
// create and include rfp doc
