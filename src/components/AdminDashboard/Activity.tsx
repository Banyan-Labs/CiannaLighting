import React, { FC, useEffect } from 'react';
import './styles/AdminDashboard.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteTheLog, getAllLogs } from '../../redux/actions/authActions';
import { FaRegTrashAlt } from 'react-icons/fa';

const Activity: FC = () => {
    const { logs } = useAppSelector(({ auth: user }) => user);
    const dispatch = useAppDispatch();

    const allUserLogs = logs?.map((log, index) => {
        const deleteLog = async(_id: string) => {
           await dispatch(deleteTheLog(_id))
           await dispatch(getAllLogs())
        };
        return (
            <tbody key={index}>
                <tr className="projects-table-dynamic-row">
                    <th className="projects-table-dynamic-name">
                        {log.name}
                    </th>
                    <td className="projects-table-dynamic-designer">
                        {log.ipAddress}
                    </td>
                    <td className="projects-table-dynamic-region">
                        {log.role}
                    </td>
                    <td className="projects-table-dynamic-region">
                    <FaRegTrashAlt onClick={()=> deleteLog(log?._id)}
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