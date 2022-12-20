import {Document} from 'mongoose'

interface RoomContainer {
    lightId: string;
    attachments:string[];
}
export default interface ProjectAttachments {
    projectId: string;
    images: RoomContainer[]; 
    pdf: string[];
}