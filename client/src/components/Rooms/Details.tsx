import React, { FC, useEffect } from 'react';
import LightDetails from './LightDetails';
import RoomDetails from './RoomDetails';
import './style/roomDetails.scss';
import Filter from './Filter';
import { useAppDispatch } from '../../app/hooks';
import useParams from '../../app/utils';
import {
    getAllProjectRoomsAction,
    getProject,
    setTheRoom,
} from '../../redux/actions/projectActions';
import { getRoomLights } from '../../redux/actions/lightActions';

const Details: FC = () => {
    const dispatch = useAppDispatch();
    const storedProjId = useParams('projectId');
    const storedRoomId = useParams('roomId');
    console.log(storedRoomId);

    const fetchData = async () => {
        dispatch(getProject(String(storedProjId)));
        dispatch(getAllProjectRoomsAction(String(storedProjId)));
        dispatch(setTheRoom(String(storedRoomId)));
        dispatch(getRoomLights(String(storedRoomId)));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container-fluid m-0 details-container d-flex row">
            <RoomDetails />
            <LightDetails />
            <Filter />
        </div>
    );
};

export default Details;
