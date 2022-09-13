import { Document } from "mongoose";


export default interface roomInterface extends Document {
  name: string;
  clientId: string;
  projectId: string;
  description: string;
  lights: string[];
}
//lights will be an array of the light-ids only and an active query will populate this array

// maybe just turn lights in this section to string, and patch the id into this when a light selection is created, and same with projects(rooms = roomIDs) -> rooms(lights = lightSelectionIDS) -> lightSelection