import React, { FC, useEffect, useState } from 'react';
import Filter from './Filter';
import useParams from '../../app/utils';
import RoomDetails from './RoomDetails';
import LightDetails from './LightSide/LightDetails';
import { useAppDispatch } from '../../app/hooks';
import {
    getAllProjectRoomsAction,
    getProject,
    setTheRoom,
} from '../../redux/actions/projectActions';
import {
    getRoomLights,
    getCatalogItems,
} from '../../redux/actions/lightActions';
import './style/roomDetails.scss';

const Details: FC = () => {
    const dispatch = useAppDispatch();
    const storedProjId = useParams('projectId');
    const storedRoomId = useParams('roomId');
    const [catalogItem, setCatalogItem] = useState(null);
    const [editLight, setEditLight] = useState(null);

    const fetchData = async () => {
        dispatch(getProject({ _id: String(storedProjId) }));
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
            <RoomDetails
                setEditLight={setEditLight}
                setCatalogItem={setCatalogItem}
            />
            <LightDetails
                catalogItem={catalogItem}
                setCatalogItem={setCatalogItem}
                setEditLight={setEditLight}
                editLight={editLight}
            />
            <Filter catalogItem={catalogItem} />
        </div>
    );
};

export default Details;
