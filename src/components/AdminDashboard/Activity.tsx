import React, { FC, useEffect } from 'react';
import './styles/AdminDashboard.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllLogs } from '../../redux/actions/authActions';
import { FaRegTrashAlt } from 'react-icons/fa';

const Activity: FC = () => {
    const { logs } = useAppSelector(({ auth: user }) => user);
    const dispatch = useAppDispatch();

    const allUserLogs = logs?.map((project, index) => {

        return (
            <tbody key={index}>
                <tr className="projects-table-dynamic-row">
                    <th className="projects-table-dynamic-name">
                        {project.name}
                    </th>
                    <td className="projects-table-dynamic-designer">
                        {project.ipAddress}
                    </td>
                    <td className="projects-table-dynamic-region">
                        {project.role}
                    </td>
                    <td className="projects-table-dynamic-region">
                    <FaRegTrashAlt
                    />
                    </td>
                </tr>
            </tbody>
        );
    });

    useEffect(() => {
        dispatch(getAllLogs());
    }, []);
    return (
        <div>
           <h2>Recent Logs</h2>
           <div>
                        <table className="dashboard-all-projects-table">
                            <thead className="table-headers">
                                <tr >
                                    <td className="" >
                                        Name 
                                    </td>
                                    <td >
                                        IP Address
                                    </td>
                                    <td>
                                        Role
                                    </td>
                                </tr>
                            </thead>
                            { allUserLogs }
                        </table>
                    </div>
        </div>
    );
};

export default Activity;