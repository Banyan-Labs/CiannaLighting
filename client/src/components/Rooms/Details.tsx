import React, { FC, useEffect, useState } from 'react';

import Filter from './Filter';
import { useParams } from '../../app/utils';
import RoomDetails from './RoomDetails';
import LightDetails from './LightSide/LightDetails';
import { useAppDispatch } from '../../app/hooks';
import {
    getAllProjectRoomsAction,
    getAttachments,
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
    const [filterBar, setFilterBar] = useState<boolean>(false);

    const fetchData = async () => {
        await dispatch(getProject({ _id: String(storedProjId) }));
        await dispatch(getAttachments(String(storedProjId)))
        await dispatch(getAllProjectRoomsAction(String(storedProjId)));
        await dispatch(setTheRoom(String(storedRoomId)));
        await dispatch(getRoomLights(String(storedRoomId)));
        await dispatch(getCatalogItems());
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="room-details-page__page-container">
            {filterBar && (
                <div
                    className="filter-bar-background"
                    onClick={() =>
                        filterBar ? setFilterBar(!filterBar) : null
                    }
                ></div>
            )}
            <div className="room-details-page__panel-wrapper left">
                <RoomDetails
                    setEditLight={setEditLight}
                    setCatalogItem={setCatalogItem}
                />
            </div>
            <div className="room-details-page__panel-wrapper right">
                <Filter
                    catalogItem={catalogItem}
                    filterBar={filterBar}
                    setFilterBar={setFilterBar}
                />
                <LightDetails
                    catalogItem={catalogItem}
                    setCatalogItem={setCatalogItem}
                    setEditLight={setEditLight}
                    editLight={editLight}
                    filterBar={filterBar}
                    setFilterBar={setFilterBar}
                />
            </div>
        </div>
    );
};

export default Details;
