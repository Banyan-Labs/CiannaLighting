import mongoose, { Schema } from "mongoose";
import ProjectAttachments from "../interfaces/projectAttachments";

const projectAttachmentsSchema: Schema = new Schema({
    projectId: {type: String, required: true},
    images: {type: Array<object>, required: true},
    pdf: {type: Array<string>, required: true}
})

export default mongoose.model<ProjectAttachments>("projectAttachments", projectAttachmentsSchema)