import React, { FC, useCallback } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import './rooms.scss';
import { FaChevronRight } from 'react-icons/fa';

const IdRooms: FC = () => {
    const { user } = useAppSelector(({ auth: user }) => user);
    const { projectRooms } = useAppSelector(({ project }) => project);
    const navigate = useNavigate();

    const projectRoute = useCallback(
        (roomId: any) => {
            const to = `/catalog/ + ?_id= ${user._id} + ${roomId}`;
            navigate(to);
        },
        [user.name, navigate]
    );

    const singleProject = projectRooms.map((room: any, index: any) => {
        return (
            <div
                className="single-project"
                style={{
                    backgroundColor: 'rgb(242 242 242',
                }}
                onClick={() => {
                    projectRoute(room._id);
                }}
                key={index}
            >
                <span style={{ color: 'black' }}>
                    Lights: <strong>{room.lights.length}</strong>
                </span>
                <div className="card-divider" />
                <h3 style={{ color: 'black' }}>{room.name}</h3>
                <div className="room-details-block" key={index}>
                    <span>
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
                    {singleProject}
                    {singleProject.length == 0 ? (
                        <div className="your-projects-none">
                            <span>There are no rooms in this project.</span>
                        </div>
                    ) : singleProject.length <= 3 ? (
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
