import React, { FC, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight, FaRegClone } from 'react-icons/fa';
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
} from 'react-icons/io';

import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { axiosPrivate } from '../../../../../api/axios';
import { RoomType } from '../../../../../redux/reducers/projectSlice';
import {
    getAllProjectRoomsAction,
    setTheYourProjects,
} from '../../../../../redux/actions/projectActions';
import { CopyType } from 'app/constants';
import { setAlertOpen, setAlertMessage } from 'redux/reducers/modalSlice';

import './rooms.scss';

const IdRooms: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const { project, projectRooms } = useAppSelector(({ project }) => project);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const roomRoute = useCallback(
        (roomId: string, projId: string) => {
            const to = `/createLight/ ?_id= ${user._id}&roomId=${roomId}&projectId=${projId}`;

            navigate(to);
        },
        [user.name, navigate]
    );

    const projectRoute = useCallback(
        (projId: string) => {
            const to = `/project/+?_id= ${user._id}&projectId=${projId}`;

            navigate(to);
        },
        [user.name, navigate]
    );

    const copyRoom = async (e: any, room: RoomType) => {
        e.preventDefault();
        e.stopPropagation();

        const axiosPriv = await axiosPrivate();
        const projectId: string = project?._id ?? '';
        const copyRoom = [room._id];
        const payload = {
            _id: projectId,
            rooms: copyRoom,
            copy: CopyType.ROOM,
            clientId: room.clientId,
        };

        try {
            const response = await axiosPriv.post('/create-project', payload);

            dispatch(setAlertOpen({ isOpen: true }));
            dispatch(
                setAlertMessage({
                    alertMessage: `Copy of ${room?.name} created in ${project?.name}.`,
                })
            );

            projectRoute(projectId);
            await dispatch(setTheYourProjects(true));
            await dispatch(getAllProjectRoomsAction(projectId));

            return response.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const ref = useRef<HTMLDivElement>(null);
    const scroll = (scrollAmount: number) => {
        ref.current ? (ref.current.scrollLeft += scrollAmount) : null;
    };

    const singleRoom = projectRooms?.map((room: any, index: any) => {
        return (
            <div
                className="single-project m-3"
                style={{
                    backgroundColor: 'rgb(242, 242, 242)',
                }}
                key={index}
                onClick={() => {
                    roomRoute(room?._id, room?.projectId);
                }}
            >
                <span style={{ color: 'black' }}>
                    Lights: <strong>{room.lights?.length}</strong>
                </span>
                <div style={{ color: 'black' }} className="cardRoom-divider" />
                <h3 style={{ color: 'black' }}>{room?.name}</h3>
                <div className="room-details-block" key={index}>
                    {!project?.archived && (
                        <FaRegClone
                            data-for="new-room"
                            data-tip="Copy Room"
                            className="clone-icon ms-3"
                            onClick={(e) => copyRoom(e, room)}
                        />
                    )}
                    <span style={{ color: 'black' }}>
                        View Details{' '}
                        <FaChevronRight className="view-details-chevron" />
                    </span>
                </div>
            </div>
        );
    });

    return (
        <>
            <div className="your-rooms">
                <div className="your-rooms-section d-flex flex-wrap" ref={ref}>
                    {singleRoom}
                    {singleRoom.length == 0 ? (
                        <div className="your-projects-none">
                            <span>There are no rooms in this project.</span>
                        </div>
                    ) : singleRoom.length >= 5 ? (
                        <div className="your-projects-icons">
                            <IoIosArrowDropleftCircle
                                id="your-project-icons-left"
                                className="your-projects-buttons"
                                onClick={() => {
                                    scroll(-200);
                                }}
                            />

                            <IoIosArrowDroprightCircle
                                className="your-projects-buttons"
                                onClick={() => {
                                    scroll(200);
                                }}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
};

export default IdRooms;
