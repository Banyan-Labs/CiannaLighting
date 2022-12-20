/* eslint-disable react/no-unescaped-entities */
import React, { FC, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAppDispatch } from '../../../../app/hooks';
import {
    viewProjectRooms,
    viewRoomLights,
    deleteThisProject,
    getAllProjects,
} from '../../../../redux/actions/projectActions';
import './style/allProjects.scss';

type Props = {
    closeModal: React.Dispatch<React.SetStateAction<any>>;
    openModal: boolean;
    setProjectModal: any;
    projectModal: any;
    deleteProject: any;
    setDeleteProject: any;
};

export const ViewModal: FC<Props> = ({
    closeModal,
    openModal,
    projectModal,
    setProjectModal,
    setDeleteProject,
    deleteProject,
}) => {
    const [tabProject, setTabProject] = useState(true);
    const [rooms, setRooms] = useState<any>(null);
    const [roomLight, setRoomLight] = useState<any>(null);
    const dispatch = useAppDispatch();

    const fetchData = async () => {
        const response = await dispatch(viewProjectRooms(projectModal._id));
        await setRooms(response);
    };
    useEffect(() => {
        fetchData();
        setRooms;
    }, []);

    const awaitData = async (roomId: any) => {
        const response = await dispatch(viewRoomLights(roomId));
        setRoomLight(response);
    };
    const fetchRoomLight = (roomId: string) => {
        awaitData(roomId);
        return awaitData;
    };
    const date = new Date(Date.parse(projectModal?.createdAt)).toDateString();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const deleteTheProject = async () => {
        await dispatch(deleteThisProject({ _id: projectModal._id }));
        await dispatch(getAllProjects());
        closeModal(!openModal);
        setProjectModal(null);
        setDeleteProject(false);
    };

    return (
        <div className="project-modal-background">
            <div className="project-modal-container">
                <div className="project-modal-close-btn">
                    <button
                        onClick={() => {
                            closeModal(!openModal);
                            setProjectModal(null);
                            setDeleteProject(false);
                        }}
                    >
                        {' '}
                        <FaTimes />
                    </button>
                </div>
                <div className="project-modal-inner-container">
                    <h2>{projectModal?.name}</h2>
                    <div className="button-display-view-container">
                        <button
                            className={tabProject ? 'viewActive' : ''}
                            onClick={() => setTabProject(true)}
                        >
                            Details
                        </button>
                        <button
                            className={
                                tabProject
                                    ? 'btn-right'
                                    : 'viewActive btn-right'
                            }
                            onClick={() => setTabProject(false)}
                        >
                            Rooms
                        </button>
                    </div>
                    <div className="new-room-modal-body">
                        {tabProject ? (
                            <div className="project-view-container d-flex row">
                                <h5 className="col-4">Created </h5>
                                <span className="col-8">{date}</span>
                                <h5 className="col-4">Designer </h5>
                                <span className="col-8">
                                    {projectModal?.clientName}
                                </span>
                                <h5 className="col-4">Region </h5>
                                <span className="col-8">
                                    {projectModal?.region}
                                </span>
                                <h5 className="col-4">Description </h5>
                                <span className="col-8">
                                    {projectModal?.description}
                                </span>
                                {deleteProject === true ? (
                                    <div
                                        onClick={() => deleteTheProject()}
                                        className="col-12 d-flex justify-content-end align-items-start"
                                    >
                                        <p className="confirm-delete">
                                            *Confirm Delete*
                                        </p>
                                        <button className=" delete-modal-button">
                                            Delete Project
                                        </button>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        ) : (
                            <div>
                                {rooms?.length > 0 ? (
                                    rooms.map(
                                        (r: any, index = r.indexOf(r)) => {
                                            const bool = roomLight
                                                ? roomLight.map((m: any) =>
                                                      m.roomId === r._id
                                                          ? true
                                                          : false
                                                  )
                                                : '';

                                            return (
                                                <div
                                                    className="d-flex row"
                                                    key={index}
                                                >
                                                    <h4 className="col-12 name-room">
                                                        {r?.name}
                                                    </h4>
                                                    <h4 className="col-3 created-tag">
                                                        Created
                                                    </h4>
                                                    <span className="col-9 created-tag-span">
                                                        {new Date(
                                                            Date.parse(
                                                                r?.createdAt
                                                            )
                                                        ).toDateString()}
                                                    </span>
                                                    <h4 className="col-3 created-tag">
                                                        Description
                                                    </h4>
                                                    <span className="col-9 created-tag-span">
                                                        {r?.description}
                                                    </span>
                                                    {r?.lights.length > 0 ? (
                                                        <div>
                                                            <div
                                                                className={
                                                                    isCollapsed
                                                                        ? 'd-flex justify-content-between btn-view-container'
                                                                        : 'd-flex justify-content-between btn-view-container-none'
                                                                }
                                                            >
                                                                <h4 className="created-tag">
                                                                    Lights(
                                                                    {
                                                                        r
                                                                            ?.lights
                                                                            .length
                                                                    }
                                                                    )
                                                                </h4>
                                                                <button
                                                                    className="btn-view-lights"
                                                                    onClick={() => {
                                                                        fetchRoomLight(
                                                                            String(
                                                                                r._id
                                                                            )
                                                                        );
                                                                        setIsCollapsed(
                                                                            !isCollapsed
                                                                        );
                                                                    }}
                                                                >
                                                                    {isCollapsed &&
                                                                    bool[0] ===
                                                                        true
                                                                        ? '-'
                                                                        : '+'}
                                                                </button>
                                                            </div>
                                                            <div
                                                                className={
                                                                    isCollapsed
                                                                        ? 'd-flex row light-view-container'
                                                                        : 'd-none'
                                                                }
                                                            >
                                                                {roomLight !==
                                                                null
                                                                    ? roomLight?.map(
                                                                          (
                                                                              l: any,
                                                                              index = l.indexOf(
                                                                                  l
                                                                              )
                                                                          ) => {
                                                                              return (
                                                                                  <div
                                                                                      className={
                                                                                          l.roomId ===
                                                                                          r._id
                                                                                              ? 'inner-light-container'
                                                                                              : 'd-none'
                                                                                      }
                                                                                      key={
                                                                                          index
                                                                                      }
                                                                                  >
                                                                                      <div className="d-flex justify-content-between align-items-start">
                                                                                          <div className="d-flex row">
                                                                                              <h4 className="m-0 name-tag">
                                                                                                  Name
                                                                                              </h4>
                                                                                              <h5 className="">
                                                                                                  {
                                                                                                      l?.item_ID
                                                                                                  }
                                                                                              </h5>
                                                                                          </div>
                                                                                          <p className="m-0 name-tag">
                                                                                              Qty.{' '}
                                                                                              {
                                                                                                  l?.quantity
                                                                                              }
                                                                                          </p>
                                                                                      </div>
                                                                                      <div className="d-flex justify-content-between row">
                                                                                          <div className="col-6 d-flex align-content-start row ">
                                                                                              <h5 className="col-6 m-0">
                                                                                                  Exterior
                                                                                                  Finish:
                                                                                              </h5>
                                                                                              <p className="col-6">
                                                                                                  {
                                                                                                      l.exteriorFinish
                                                                                                  }
                                                                                              </p>
                                                                                              <h5 className="col-6 m-0">
                                                                                                  Interior
                                                                                                  Finish:
                                                                                              </h5>
                                                                                              <p className="col-6">
                                                                                                  {
                                                                                                      l.interiorFinish
                                                                                                  }
                                                                                              </p>
                                                                                              <h5 className="col-6 m-0">
                                                                                                  Environment:
                                                                                              </h5>
                                                                                              <p className="col-6 m-0">
                                                                                                  {
                                                                                                      l.environment
                                                                                                  }
                                                                                              </p>
                                                                                              <h5 className="col-6 m-0">
                                                                                                  Safety
                                                                                                  Cert:
                                                                                              </h5>
                                                                                              <p className="col-6 m-0">
                                                                                                  {
                                                                                                      l.safetyCert
                                                                                                  }
                                                                                              </p>
                                                                                              <h5 className="col-6 m-0">
                                                                                                  Project
                                                                                                  Voltage:
                                                                                              </h5>
                                                                                              <p className="col-6">
                                                                                                  {
                                                                                                      l.projectVoltage
                                                                                                  }
                                                                                              </p>
                                                                                              <h5 className="col-6 m-0">
                                                                                                  Socket
                                                                                                  Type:
                                                                                              </h5>
                                                                                              <p className="col-6">
                                                                                                  {
                                                                                                      l.socketType
                                                                                                  }
                                                                                              </p>
                                                                                              <h5 className="col-6 m-0">
                                                                                                  Mounting:
                                                                                              </h5>
                                                                                              <p className="col-6">
                                                                                                  {
                                                                                                      l.mounting
                                                                                                  }
                                                                                              </p>
                                                                                          </div>
                                                                                          <div className="col-6 d-flex row">
                                                                                              <h5 className="col-6 m-0">
                                                                                                  Lens
                                                                                                  Material:
                                                                                              </h5>
                                                                                              <p className="col-6">
                                                                                                  {
                                                                                                      l.lensMaterial
                                                                                                  }
                                                                                              </p>
                                                                                              <h5 className="col-6">
                                                                                                  Options:
                                                                                              </h5>
                                                                                              <p className="col-6">
                                                                                                  {
                                                                                                      l.acrylicOptions
                                                                                                  }
                                                                                              </p>
                                                                                              <h5 className="col-6 m-0">
                                                                                                  Crystal
                                                                                                  Type:
                                                                                              </h5>
                                                                                              <p className="col-6">
                                                                                                  {
                                                                                                      l.crystalType
                                                                                                  }
                                                                                              </p>
                                                                                              <h5 className="col-6">
                                                                                                  Options:
                                                                                              </h5>
                                                                                              <p className="col-6">
                                                                                                  {
                                                                                                      l.crystalPinColor
                                                                                                  }{' '}
                                                                                                  <br />{' '}
                                                                                                  {
                                                                                                      l.crystalPinType
                                                                                                  }{' '}
                                                                                              </p>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              );
                                                                          }
                                                                      )
                                                                    : ''}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <h4 className="no-lights">
                                                            No Lights In this
                                                            room
                                                        </h4>
                                                    )}
                                                </div>
                                            );
                                        }
                                    )
                                ) : (
                                    <h4 className="no-rooms">
                                        no rooms in this project
                                    </h4>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
