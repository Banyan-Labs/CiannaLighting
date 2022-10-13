import React, { FC } from 'react';
import { FaRegEdit, FaRegClone, FaCircle, FaArchive } from 'react-icons/fa';
import { BsChevronLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { UserType } from '../../app/typescriptTypes';
import dataHolding from '../Dashboard/YourProjects/projectDetails';
import {getProject} from "../../redux/actions/projectActions"
import { useAppDispatch } from '../../app/hooks';

interface ProjectSummaryProps {
    user: UserType;
    details: any;
}

const ProjectSummary: FC<ProjectSummaryProps> = ({ user, details }) => {
    const dispatch = useAppDispatch()
    const Color =
        Object.keys(dataHolding.setData().color).length === 0
            ? '#AC92EB'
            : dataHolding.setData().color;
    console.log(details, "DETAILS from project summary")
    const archiveSet = async(e: any) => {
        e.preventDefault()
        try{
            await dispatch(getProject({"_id": details._id,"archived": !details.archived}))
        }catch(error: any){
            console.log("Error archiving item: ", error.message)
            alert("Can not archive project.")
        }


    }

    const date = new Date(Date.parse(details?.createdAt)).toDateString();
    return (
        <div className="project-summary-container">
            <div className="projects-summary">
                <div className="back-to-projects">
                    <Link to={`/projects/all/${user}`}>
                        <BsChevronLeft className="chevron-icon" /> Back to
                        Projects
                    </Link>
                </div>
                <div className="project-summary-top-bar">
                    <div className="project-summary-name-and-date">
                        <h3 className="project-summary-project-name">
                            {details?.name}
                            <FaCircle
                                className="circle-icon"
                                style={{ color: String(Color) }}
                            />
                        </h3>
                        <p className="project-summary-date">Created: {date}</p>
                    </div>
                    <div className="project-summary-icons">
                        <FaRegEdit className="edit-icon" />
                        <div></div>
                        <FaRegClone className="clone-icon" />
                        <div></div>
                        <FaArchive className="archive-icon" onClick={(e)=> archiveSet(e)} />
                    </div>
                    <div className="project-summary-status">
                        <p className="status">Status: {details?.status}</p>
                    </div>
                </div>
                <div className="project-summary-text-container">
                    <p>Description:</p>
                    <p className="project-summary-description-text">
                        {details?.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProjectSummary;
