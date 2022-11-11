import React, { FC, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';

import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import Pagination from '../../../Dashboard/DashboardPageLower/Pagination/Pagination';
import './style/activityTable.scss';
const Activity: FC = () => {
    const { project } = useAppSelector(({ project }) => project);
    const projectsPerPage = 5;

    const rooms = project?.activity?.rooms;
    const [roomPage, setRoomPage] = useState<number>(1);
    const roomLastIndex = roomPage * projectsPerPage;
    const roomFirstIndex = roomLastIndex - projectsPerPage;
    const lastRoom = Math.ceil(rooms ? rooms.length / projectsPerPage : 1);

    const archRestore = project?.activity?.archiveRestore;
    const [archPage, setArchPage] = useState<number>(1);
    const archLastIndex = archPage * projectsPerPage;
    const archFirstIndex = archLastIndex - projectsPerPage;
    const lastArch = Math.ceil(
        archRestore ? archRestore.length / projectsPerPage : 1
    );

    const status = project?.activity?.status;
    const [statusPage, setStatusPage] = useState<number>(1);
    const statusLastIndex = statusPage * projectsPerPage;
    const statusFirstIndex = statusLastIndex - projectsPerPage;
    const lastStatus = Math.ceil(status ? status.length / projectsPerPage : 1);

    const setCurrentPage = (page: number, action: string): void => {
        const actionTrigger: any = {
            R: setRoomPage(page),
            A: setArchPage(page),
            S: setStatusPage(page),
        };
        actionTrigger[String(action)];
    };

    const activityTables = (activity: string[] | undefined) => {
        return (
            <tbody>
                {activity?.map((act: string, index: number) => {
                    return (
                        <tr
                            key={act[0][0] + String(index)}
                            className="projects-table-dynamic-row"
                        >
                            <th className="projects-table-dynamic-name">
                                {act[0]}
                            </th>
                            <td></td>
                            <td className="projects-table-dynamic-dots, activity-date">
                                {act[1]}
                            </td>
                            <td></td>
                        </tr>
                    );
                })}
            </tbody>
        );
    };

    return (
        <div className="activity-container">
            <div className="activity-head">
                {project?.activity?.createUpdate}
            </div>
            <label className="activity-label">Room Actions</label>
            <table className="activity-table">
                {activityTables(rooms?.slice(roomFirstIndex, roomLastIndex))}
                <tfoot>
                    <tr className="projects-table-dynamic-row"></tr>
                </tfoot>
            </table>
            <div className="activity-pagination">
                {roomPage > 1 && (
                    <li
                        onClick={() => setRoomPage(roomPage - 1)}
                        className="page-link"
                    >
                        <MdNavigateBefore
                            className="arrow-pagination"
                            id="arrow-pag-before"
                        />
                    </li>
                )}
                <Pagination
                    totalProjects={rooms ? rooms.length - 1 : 0}
                    projectsPerPage={projectsPerPage}
                    currentPage={roomPage}
                    paginate={(page: number) => setCurrentPage(page, 'R')}
                />
                {roomPage < lastRoom && (
                    <li
                        onClick={(e) => {
                            e.preventDefault();
                            setRoomPage(roomPage + 1);
                        }}
                        className="page-link"
                    >
                        <MdNavigateNext
                            className="arrow-pagination"
                            id="arrow-pag-next"
                        />
                    </li>
                )}
            </div>

            <label className="activity-label">Archive / Restore</label>
            <table className="activity-table">
                {activityTables(
                    archRestore?.slice(archFirstIndex, archLastIndex)
                )}
                <tfoot>
                    <tr className="projects-table-dynamic-row"></tr>
                </tfoot>
            </table>
            <div className="activity-pagination">
                {archPage > 1 && (
                    <li
                        onClick={() => setArchPage(archPage - 1)}
                        className="page-link"
                    >
                        <MdNavigateBefore
                            className="arrow-pagination"
                            id="arrow-pag-before"
                        />
                    </li>
                )}
                <Pagination
                    totalProjects={archRestore ? archRestore.length - 1 : 0}
                    projectsPerPage={projectsPerPage}
                    currentPage={archPage}
                    paginate={(page: number) => setCurrentPage(page, 'A')}
                />
                {archPage < lastArch && (
                    <li
                        onClick={(e) => {
                            e.preventDefault();
                            setArchPage(archPage + 1);
                        }}
                        className="page-link"
                    >
                        <MdNavigateNext
                            className="arrow-pagination"
                            id="arrow-pag-next"
                        />
                    </li>
                )}
            </div>
            <label className="activity-label">Status Change</label>
            <table className="activity-table">
                {activityTables(
                    status?.slice(statusFirstIndex, statusLastIndex)
                )}
                <tfoot>
                    <tr className="projects-table-dynamic-row"></tr>
                </tfoot>
            </table>
            <div className="activity-pagination">
                {statusPage > 1 && (
                    <li
                        onClick={() => setStatusPage(statusPage - 1)}
                        className="page-link"
                    >
                        <MdNavigateBefore
                            className="arrow-pagination"
                            id="arrow-pag-before"
                        />
                    </li>
                )}
                <Pagination
                    totalProjects={status ? status.length - 1 : 0}
                    projectsPerPage={projectsPerPage}
                    currentPage={statusPage}
                    paginate={(page: number) => setCurrentPage(page, 'S')}
                />
                {statusPage < lastStatus && (
                    <li
                        onClick={(e) => {
                            e.preventDefault();
                            setStatusPage(statusPage + 1);
                        }}
                        className="page-link"
                    >
                        <MdNavigateNext
                            className="arrow-pagination"
                            id="arrow-pag-next"
                        />
                    </li>
                )}
            </div>
        </div>
    );
};

export default Activity;
