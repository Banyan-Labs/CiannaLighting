import React, { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../../../../../api/axios';

import './rooms.scss';
import { FaChevronRight, FaRegClone } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import { RoomType } from '../../../../../redux/reducers/projectSlice';
import { getAllProjectRoomsAction } from '../../../../../redux/actions/projectActions';

// check(room).map((lights: LightType)=> dave sucks)

const IdRooms: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const { project, projectRooms } = useAppSelector(({ project }) => project);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const projectRoute = useCallback(
        (roomId: string, projId: string) => {
            const to = `/createLight/ ?_id= ${user._id}&roomId=${roomId}&projectId=${projId}`;
            navigate(to);
        },
        [user.name, navigate]
    );

    const copyRoom = async (e: any, room: RoomType) => {
        e.preventDefault();
        const axiosPriv = await axiosPrivate();
        const projectId: string = project?._id ?? '';
        const copyRoom = [room._id];
        const payload = {
            _id: projectId,
            rooms: copyRoom,
            copy: 'room',
            clientId: room.clientId,
        };

        try {
            const response = await axiosPriv.post('/create-project', payload);
            dispatch(getAllProjectRoomsAction(projectId));
            return response.data;
        } catch (error: any) {
            console.log('Error: ', error);
        }
    };

    const singleRoom = projectRooms?.map((room: any, index: any) => {
        return (
            <div
                className="single-project"
                style={{
                    backgroundColor: 'rgb(242, 242, 242)',
                }}
                key={index}
            >
                <span style={{ color: 'black' }}>
                    Lights: <strong>{room.lights?.length}</strong>
                </span>
                <div style={{ color: 'black' }} className="cardRoom-divider" />
                <h3 style={{ color: 'black' }}>{room?.name}</h3>
                <div className="room-details-block" key={index}>
                    <FaRegClone
                        data-for="new-room"
                        data-tip="Copy Room"
                        className="clone-icon"
                        onClick={(e) => copyRoom(e, room)}
                    />
                    <ReactTooltip id="new-room" />
                    <span
                        style={{ color: 'black' }}
                        onClick={() => {
                            projectRoute(room?._id, room?.projectId);
                        }}
                    >
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
                <div className="your-rooms-section">
                    {singleRoom}
                    {singleRoom.length == 0 ? (
                        <div className="your-projects-none">
                            <span>There are no rooms in this project.</span>
                        </div>
                    ) : singleRoom.length <= 3 ? (
                        <div className="your-projects-none other-none">
                            <span style={{ fontSize: '14px' }}>
                                No other rooms for this project
                            </span>
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
