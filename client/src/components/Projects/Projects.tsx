import React, { FC } from "react";

import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { FaRegEdit, FaRegClone, FaRegCheckSquare, FaCircle } from "react-icons/fa";
import {BsChevronLeft} from "react-icons/bs"
import "./style/projects.scss";

const Projects: FC = ({}) => {
  const { user } = useParams();

  
  return (
    <>
      <Navbar user={user} setUser={() => ""} />
      <div className="projects-summary">
        <div className="back-to-projects">
          <BsChevronLeft className="icon-chevron"/>
          <p>Back to Projects</p>
        </div>
        <div className="project-summary-top-bar">
          <div className="project-summary-name-and-date">
            <h3 className="project-summary-project-name">Salt Lake Temple<FaCircle className='circle-icon' /></h3>
            <p className ='project-summary-date'>Created on August 2, 2022</p>
          </div>
          <div className="project-summary-icons">
            <FaRegEdit className="edit-icon" />
            <div></div>
            <FaRegClone className="clone-icon"/>
            <div></div>
            <FaRegCheckSquare className="archive-icon"/>
          </div>
          <div className="project-summary-status">
            <p className="status">Status: NEW</p>
          </div>
        </div>
        <div className="project-summary-text-container">
          <h4>Description:</h4>
          <p className="project-summary-description-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aperiam 
            repudiandae inventore pariatur saepe dolorum, quisquam corporis earum, 
            tempore mollitia sint consequatur velit facilis laboriosam modi cupiditate 
            natus. Animi, vero. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Harum voluptas atque molestiae suscipit, voluptatibus veritatis repellendus, 
            inventore numquam reprehenderit veniam porro rerum. Est similique rem fuga d
            istinctio cum nam quasi?
          </p>
        </div>
      </div> 
      
    
    </>
  );
};

export default Projects;
