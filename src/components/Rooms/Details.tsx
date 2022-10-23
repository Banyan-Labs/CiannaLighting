import React, { FC, useEffect, useState } from 'react';
import LightDetails from './LightSide/LightDetails';
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
import {
    getRoomLights,
    getCatalogItems,
} from '../../redux/actions/lightActions';

const Details: FC = () => {
    const dispatch = useAppDispatch();
    const storedProjId = useParams('projectId');
    const storedRoomId = useParams('roomId');
    const [catalogItem, setCatalogItem] = useState(null);

    const fetchData = async () => {
        dispatch(getProject(String(storedProjId)));
        dispatch(getAllProjectRoomsAction(String(storedProjId)));
        dispatch(setTheRoom(String(storedRoomId)));
        dispatch(getRoomLights(String(storedRoomId)));
        dispatch(getCatalogItems());
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container-fluid details-container m-0 p-0 d-flex row">
            <RoomDetails />
            <LightDetails
                catalogItem={catalogItem}
                setCatalogItem={setCatalogItem}
            />
            <Filter catalogItem={catalogItem} />
        </div>
    );
};

export default Details;