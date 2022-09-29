import { Document } from "mongoose";

export default interface statusAndRegion extends Document {
    label: string,
    value: string
}
