import React, { FC, useState } from "react";
import { FaSlidersH } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import "./style/allProjects.scss";
import testData from "./testData";
import Pagination from "../Pagination/Pagination";
import MiniMenu from "./MiniMenu";

const AllProjects: FC = ({}) => {
  const [filterProjects, setFilterProjects] = useState("");
  const [projectList, setProjectList] = useState(testData);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(5);

  const [miniMenu, setMiniMenu] = useState(false)

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projectList.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  
  const paginate = (updatePage: number) => {
    setCurrentPage(updatePage);
  };
  const page = currentPage;

  const allProjectsTableDisplay = currentProjects.map((project, index) => {
    console.log(project.name);
    return (
      <tbody key={index}>
        <tr className="projects-table-dynamic-row">
          <th className="projects-table-dynamic-name">{project.name}</th>
          <td className="projects-table-dynamic-designer">
            {project.clientName}
          </td>
          <td className="projects-table-dynamic-region">{project.region}</td>
          {/* <td className="projects-table-dynamic-contact">{project.contact}</td> */}
          <td className="projects-table-dynamic-status">{project.status}</td>
          <td onClick={()=>setMiniMenu(true)} onMouseLeave={()=>setMiniMenu(false)} className="projects-table-dynamic-dots">
            <BsThreeDots />
            <div>
              
            </div>
          </td>
        </tr>
      </tbody>
    );
  });

  return (
    <div className="all-projects-container">
      <div>
        <div className="form-bar-button-container">
          <input
            className="dashboard-all-projects-search-bar"
            type="text"
            placeholder="Search"
            onChange={(e) => setFilterProjects(e.target.value)}
          />
          <FaSlidersH className="dashboard-all-projects-submit" />
        </div>
        <div>
          <table className="dashboard-all-projects-table">
            <thead className="table-headers">
              <tr className="rows">
                <td className="projects-table-name">Name</td>
                <td className="projects-table-designer">Designer</td>
                <td className="projects-table-region">Region</td>
                {/* <td className="projects-table-contact">Contact</td> */}
                <td className="projects-table-status">Status</td>
                <td className="projects-table-dots"> </td>
              </tr>
            </thead>
             {miniMenu === true && <MiniMenu />}
            {allProjectsTableDisplay}
           
          </table>
          <div className="pages-list">
            <div className="page-bar">
              <p className="showing">
                Showing {indexOfFirstProject + 1} - {indexOfLastProject} of{" "}
                {projectList.length}
              </p>
              <div className="page-counter">
                 <Pagination
                totalProjects={projectList.length}
                projectsPerPage={projectsPerPage}
                paginate={paginate}
                page={page}
              />
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllProjects;
