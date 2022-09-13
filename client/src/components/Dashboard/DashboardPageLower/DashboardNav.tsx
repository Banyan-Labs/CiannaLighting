import React, { FC, useState } from "react";
import AllProjects from './DashboardSubComponents/AllProjects'
import Archived from './DashboardSubComponents/Archived'
import './style/dashboardNav.scss'
const DashboardNav: FC =({}) => {
    const [renderedPage, setRenderedPage] = useState('All Projects')
  return (
    <>
        <nav className="dashboard-navbar-container">
            <div className="dashboard-links" onClick={()=>setRenderedPage('All Projects')}>All Projects</div>
            <div className="dashboard-links" onClick={()=>setRenderedPage('Archived')}>Archived</div>
            <div className="dashboard-navbar-vertical-divider" />
        </nav>
        <div>
            {renderedPage === 'All Projects'?
            <AllProjects />:
            renderedPage === 'Archived'?
            <Archived />:
            null
        }
        </div>
    </>
    
  )
}

export default DashboardNav