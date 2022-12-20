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
    const [filterBar, setFilterBar] = useState<boolean>(false);

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
        <>
            {filterBar && (
                <div
                    className="filter-bar-background"
                    onClick={() =>
                        filterBar ? setFilterBar(!filterBar) : null
                    }
                ></div>
            )}
            <div className="container-fluid details-container m-0 p-0 col-lg-12 d-flex row">
                <RoomDetails
                    setEditLight={setEditLight}
                    setCatalogItem={setCatalogItem}
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
            <Filter
                catalogItem={catalogItem}
                filterBar={filterBar}
                setFilterBar={setFilterBar}
            />
        </>
    );
};

export default Details;
