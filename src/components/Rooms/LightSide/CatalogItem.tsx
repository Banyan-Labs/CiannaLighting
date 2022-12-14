import React, { FC, useState, FormEvent } from 'react';
import useParams from '../../../app/utils';
import Default2 from '../../../assets/celestial-room.jpeg';
import { BsChevronLeft, BsChevronDown } from 'react-icons/bs';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
    createLight,
    getRoomLights,
    theEditLight,
    setSpecFile,
} from '../../../redux/actions/lightActions';
import {
    getProject,
    setTheRoom,
    getAllProjectRoomsAction,
} from '../../../redux/actions/projectActions';
import Pictures from './Pictures';

interface catalogPros {
    setCatalogItem: any;
    catalogItem: any;
    editLight: any;
    setEditLight: any;
}

type LightType = {
    exteriorFinish: string;
    interiorFinish: string;
    environment: string;
    safetyCert: string;
    projectVoltage: string;
    socketType: string;
    lensMaterial: string;
    glassOptions: string;
    acrylicOptions: string;
    crystalType: string;
    crystalPinType: string;
    crystalPinColor: string;
    mounting: string;
    item_ID: string;
    roomName: string;
    roomId: string;
    projectId: string;
    clientId: string;
    quantity: number;
};

const CatalogItem: FC<catalogPros> = ({
    setCatalogItem,
    catalogItem,
    editLight,
    setEditLight,
}) => {
    const dispatch = useAppDispatch();
    const storedProjId = useParams('projectId');
    const storedRoomId = useParams('roomId');
    const userId = useParams('_id');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [anotherCollapsed, setAnotherCollapsed] = useState(true);
    const { user } = useAppSelector(({ auth: user }) => user);
    const { room, attachments, projectId, roomLights, roomId, proposal} = useAppSelector(
        ({ project }) => project
    );
    const [count, setCount] = useState<number>(
        editLight !== null ? editLight?.quantity : 1
    );

    const lightID = user._id + catalogItem.item_ID + roomId;

    const [catalogDetails, setCatalogDetails] = useState<LightType>({
        exteriorFinish:
            editLight !== null
                ? editLight?.exteriorFinish
                : catalogItem.exteriorFinish[0].split(',')[0],
        interiorFinish:
            editLight !== null
                ? editLight?.interiorFinish
                : catalogItem.interiorFinish[0].split(',')[0],
        environment:
            editLight !== null
                ? editLight?.environment
                : catalogItem.environment[0].split(',')[0],
        safetyCert:
            editLight !== null
                ? editLight?.safetyCert
                : catalogItem.safetyCert[0].split(',')[0],
        projectVoltage:
            editLight !== null
                ? editLight?.projectVoltage
                : catalogItem.environment[0].split(',')[0], // change when you go to production
        socketType:
            editLight !== null
                ? editLight?.socketType
                : catalogItem.socketType[0].split(',')[0],
        lensMaterial:
            editLight !== null
                ? editLight?.lensMaterial
                : catalogItem.lensMaterial[0].split(',')[0],
        glassOptions:
            editLight !== null
                ? editLight?.glassOptions
                : catalogItem.glassOptions[0].split(',')[0],
        acrylicOptions:
            editLight !== null
                ? editLight?.acrylicOptions
                : catalogItem.acrylicOptions[0].split(',')[0],
        crystalType:
            editLight !== null
                ? editLight?.crystalType
                : catalogItem.crystalType[0].split(',')[0],
        crystalPinType:
            editLight !== null
                ? editLight?.crystalType
                : catalogItem.crystalType[0].split(',')[0], // change when you go to production
        crystalPinColor:
            editLight !== null
                ? editLight?.exteriorFinish
                : catalogItem.crystalType[0].split(',')[0], // change when you go to production
        mounting:
            editLight !== null ? editLight?.mounting : catalogItem.mounting[0].split(',')[0],
        item_ID: editLight !== null ? editLight?.item_ID : catalogItem.item_ID,
        roomName: String(room?.name),
        roomId: String(storedRoomId),
        projectId: String(storedProjId),
        clientId: String(userId),
        quantity: count,
    });

    const handleFormInput = (e: FormEvent<HTMLSelectElement>) => {
        setCatalogDetails({
            ...catalogDetails,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    console.log('**catalogDetails**', catalogDetails);

    const editFormat = (arr: any, defVal: any) => {
        const reFormat = [
            defVal,
            ...arr[0].split(',').filter((x: any) => x !== defVal),
        ];
        return reFormat;
    };

    const returnToNull = () => {
        setEditLight(null);
        setCatalogItem(null);
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const propCheck = proposal.filter((item:any)=> item.sub ? '' : item).find((item:any)=> item.itemID == catalogDetails.item_ID );
        const propID = propCheck ? propCheck._id : '';
        const rfpPass = {
            propID: propID,
            description: catalogItem.itemDescription,
            lampType: catalogItem.lampType, 
            lampColor: catalogItem.lampColor,
            wattsPer:  catalogItem.wattsPerLamp,
            price: catalogItem.price,
            totalWatts: catalogItem.wattsPerLamp * count,
            numberOfLamps: catalogItem.numberOfLamps,
            totalLumens: catalogItem.powerInWatts, 
        }
        try {
            if (editLight === null) {
                console.log('pre:', roomLights[roomLights.length - 1]);

                console.log('post: ', roomLights[roomLights.length - 1]);
                console.log('ItemSpecs!: ', catalogItem.specs);

                if (catalogItem.specs.length) {
                    if (attachments.length) {
                        dispatch(
                            setSpecFile(
                                {
                                    projId: projectId,
                                    pdf: catalogItem.specs,
                                    images: [
                                        {
                                            lightId: lightID,
                                            attachments: catalogItem.specs,
                                        },
                                    ],
                                    edit: 'add',
                                },
                                false
                            )
                        );
                    } else {
                        dispatch(
                            setSpecFile(
                                {
                                    projId: projectId,
                                    pdf: catalogItem.specs,
                                    images: [
                                        {
                                            lightId: lightID,
                                            attachments: catalogItem.specs,
                                            edit: 'add',
                                        },
                                    ],
                                },
                                true
                            )
                        );
                    }
                }
            } else {
                dispatch(theEditLight({...catalogDetails, ...rfpPass}, editLight._id));
            }
            await dispatch(createLight({...catalogDetails, ...rfpPass}));
            setCatalogDetails({
                exteriorFinish: catalogItem.exteriorFinish[0].split(',')[0],
                interiorFinish: catalogItem.interiorFinish[0].split(',')[0],
                environment: catalogItem.environment[0].split(',')[0],
                safetyCert: catalogItem.safetyCert[0].split(',')[0],
                projectVoltage: catalogItem.crystalType[0].split(',')[0],
                socketType: catalogItem.socketType[0].split(',')[0],
                lensMaterial: catalogItem.lensMaterial[0].split(',')[0],
                glassOptions: catalogItem.glassOptions[0].split(',')[0],
                acrylicOptions: catalogItem.acrylicOptions[0].split(',')[0],
                crystalType: catalogItem.crystalType[0].split(',')[0],
                crystalPinType: catalogItem.crystalType[0].split(',')[0],
                crystalPinColor: catalogItem.crystalType[0].split(',')[0],
                mounting: catalogItem.mounting[0].split(',')[0],
                item_ID: catalogItem.item_ID,
                roomName: String(room?.name),
                roomId: String(storedRoomId),
                projectId: String(storedProjId),
                clientId: String(userId),
                quantity: count,
            });
            await dispatch(getProject({ _id: String(storedProjId) }));
            dispatch(setTheRoom(String(storedRoomId)));
            dispatch(getAllProjectRoomsAction(String(storedProjId)));
            await dispatch(getRoomLights(String(storedRoomId)));
            setCatalogItem(null);
            setEditLight(null);
        } catch (err) {
            console.log('Error: ' + err);
        }
    };
    return (
        <form
            onSubmit={onSubmit}
            className="d-flex catalog-container container-fluid row"
            // style={{ border: '2px solid yellow' }}
        >
            <div className="col-5 item-img-container d-flex row justify-content-between container-type-back align-content-start m-0">
                <img className="col-12 p-0" src={Default2} alt="" />
                <Pictures />
                <div className="col-12">
                    <h4
                        className="collapse-button d-flex justify-content-between align-items-center p-0 m-0"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        Use Packages <span>{isCollapsed ? '-' : '+'} </span>
                    </h4>
                    <div
                        className={
                            !isCollapsed
                                ? 'container-left-packages-light d-none'
                                : 'container-left-packages-off '
                        }
                    >
                        <div className=" col-12 d-flex row m-0 ">
                            {catalogItem?.usePackages[0]
                                .split(',')
                                .map((p: any, index = p.indexOf(p)) => {
                                    return (
                                        <p
                                            key={index}
                                            className=" col-12 p-0 package-list m-0 justify-content-center"
                                        >
                                            {p}
                                        </p>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <h4
                        className="collapse-button d-flex justify-content-between align-items-center p-0 m-0"
                        onClick={() => setAnotherCollapsed(!anotherCollapsed)}
                    >
                        Specifications{' '}
                        <span>{anotherCollapsed ? '-' : '+'} </span>
                    </h4>
                    <div
                        className={
                            !anotherCollapsed
                                ? 'container-left-spec-off'
                                : 'container-left-spec spec-main-container'
                        }
                    >
                        <div className="d-flex col-12 row  justify-content-end m-0">
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Body Diameter</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.bodyDiameter}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Body Length</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.bodyLength}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Body Width</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.bodyWidth}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Body Height</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.bodyHeight}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Fixture Height</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.fixtureOverallHeight}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Sconce Height</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.sconceHeight}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Sconce Width</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.sconceWidth}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Sconce Extension</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.sconceExtension}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Socket Quantity</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.socketQuantity}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Lamp Type</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.lampType}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Lamp Color</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.lampColor}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Number Of Lamps</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.numberOfLamps}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Watts Per Lamp</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.wattsPerLamp}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Power In Watts</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.powerInWatts}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Lumens</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.lumens}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Estimated Weight</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.estimatedWeight}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Price</p>
                                <p className="p-0 m-0 number-spec">
                                    ${catalogItem.price}
                                </p>
                            </div>
                            <div className="d-flex spec-container justify-content-between p-0 m-0">
                                <p className="p-0 m-0">Material</p>
                                <p className="p-0 m-0 number-spec">
                                    {catalogItem.material}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            !anotherCollapsed
                                ? 'container-down-off'
                                : 'container-down col-12 d-flex justify-content-center'
                        }
                    >
                        <p>
                            <BsChevronDown className="downArrow" />
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-7 d-flex row justify-content-between container-type-back align-content-start m-0">
                <p className="type-catalog-item m-0 col-6">Traditional</p>
                <p
                    onClick={() => returnToNull()}
                    className="catalog-back m-0 col-6"
                >
                    <BsChevronLeft className="chevron-icon" /> Back to Catalog
                </p>
                {editLight !== null ? (
                    <h5 className="d-flex justify-content-end">
                        Edit Light in {editLight?.roomName}
                    </h5>
                ) : (
                    ''
                )}

                <div className="col-12 d-flex justify-content-start p-0 name-id-catalog row">
                    <h2 className="">
                        {catalogItem.name} <br />{' '}
                        <span>{catalogItem.item_ID}</span>
                    </h2>
                    <p>{catalogItem.itemDescription}</p>
                </div>
                {/* where the inputs start */}
                <div className="col-12 d-flex row options-main-container p-0 m-0">
                    <h3>Options:</h3>
                    <div className="col-6">
                        <div className="d-flex select-container">
                            <label
                                htmlFor="status-select-menu"
                                className="label-light col-6"
                            >
                                Exterior Finish
                            </label>

                            <select
                                id="exteriorFinish"
                                name="exteriorFinish"
                                onChange={(e) => handleFormInput(e)}
                                required
                                className="col-6 "
                            >
                                {!editLight
                                    ? catalogItem.exteriorFinish[0]
                                          .split(',')
                                          .map(
                                              (
                                                  ef: string,
                                                  index = ef.indexOf(ef)
                                              ) => {
                                                  return (
                                                      <option
                                                          key={index}
                                                          value={ef}
                                                      >
                                                          {ef}
                                                      </option>
                                                  );
                                              }
                                          )
                                    : editFormat(
                                          catalogItem.exteriorFinish,
                                          editLight.exteriorFinish
                                      ).map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return (
                                                  <option
                                                      key={index}
                                                      value={ef}
                                                  >
                                                      {ef}
                                                  </option>
                                              );
                                          }
                                      )}
                            </select>
                        </div>
                        <div className="d-flex select-container">
                            <label
                                htmlFor="status-select-menu"
                                className="label-light col-6"
                            >
                                Interior Finish
                            </label>
                            <br />
                            <select
                                id="interiorFinish"
                                name="interiorFinish"
                                onChange={(e) => handleFormInput(e)}
                                required
                                className="col-6"
                            >
                                {!editLight
                                    ? catalogItem.interiorFinish[0]
                                          .split(',')
                                          .map(
                                              (
                                                  ef: string,
                                                  index = ef.indexOf(ef)
                                              ) => {
                                                  return (
                                                      <option
                                                          key={index}
                                                          value={ef}
                                                      >
                                                          {ef}
                                                      </option>
                                                  );
                                              }
                                          )
                                    : editFormat(
                                          catalogItem.interiorFinish,
                                          editLight.interiorFinish
                                      ).map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return (
                                                  <option
                                                      key={index}
                                                      value={ef}
                                                  >
                                                      {ef}
                                                  </option>
                                              );
                                          }
                                      )}
                            </select>
                        </div>
                        <div className="d-flex select-container">
                            <label
                                htmlFor="status-select-menu"
                                className="label-light col-6"
                            >
                                Environment
                            </label>
                            <select
                                id="environment"
                                name="environment"
                                onChange={(e) => handleFormInput(e)}
                                required
                                className="col-6 "
                            >
                                {!editLight
                                    ? catalogItem.environment[0]
                                          .split(',')
                                          .map(
                                              (
                                                  ef: string,
                                                  index = ef.indexOf(ef)
                                              ) => {
                                                  return (
                                                      <option
                                                          key={index}
                                                          value={ef}
                                                      >
                                                          {ef}
                                                      </option>
                                                  );
                                              }
                                          )
                                    : editFormat(
                                          catalogItem.environment,
                                          editLight.environment
                                      ).map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return (
                                                  <option
                                                      key={index}
                                                      value={ef}
                                                  >
                                                      {ef}
                                                  </option>
                                              );
                                          }
                                      )}
                            </select>
                        </div>
                        <div className="d-flex select-container">
                            <label
                                htmlFor="status-select-menu"
                                className="label-light col-6"
                            >
                                Safety Cert
                            </label>
                            <br />
                            <select
                                id="safetyCert"
                                name="safetyCert"
                                onChange={(e) => handleFormInput(e)}
                                required
                                className="col-6"
                            >
                                {!editLight
                                    ? catalogItem.safetyCert[0]
                                          .split(',')
                                          .map(
                                              (
                                                  ef: string,
                                                  index = ef.indexOf(ef)
                                              ) => {
                                                  return (
                                                      <option
                                                          key={index}
                                                          value={ef}
                                                      >
                                                          {ef}
                                                      </option>
                                                  );
                                              }
                                          )
                                    : editFormat(
                                          catalogItem.safetyCert,
                                          editLight.safetyCert
                                      ).map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return (
                                                  <option
                                                      key={index}
                                                      value={ef}
                                                  >
                                                      {ef}
                                                  </option>
                                              );
                                          }
                                      )}
                            </select>
                        </div>
                        <div className="d-flex select-container">
                            <label
                                htmlFor="status-select-menu"
                                className="label-light col-6"
                            >
                                Project Voltage
                            </label>
                            <br />
                            <select
                                id="projectVoltage"
                                name="projectVoltage"
                                onChange={(e) => handleFormInput(e)}
                                required
                                className="col-6"
                            >
                                {!editLight
                                    ? catalogItem.exteriorFinish[0]
                                          .split(',')
                                          .map(
                                              (
                                                  ef: string,
                                                  index = ef.indexOf(ef)
                                              ) => {
                                                  return (
                                                      // change this line for production
                                                      <option
                                                          key={index}
                                                          value={ef}
                                                      >
                                                          {ef}
                                                      </option>
                                                  );
                                              }
                                          )
                                    : editFormat(
                                          catalogItem.exteriorFinish,
                                          editLight.projectVoltage
                                      ).map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return (
                                                  // change this line for production
                                                  <option
                                                      key={index}
                                                      value={ef}
                                                  >
                                                      {ef}
                                                  </option>
                                              );
                                          }
                                      )}
                            </select>
                        </div>
                        <div className="d-flex select-container">
                            <label
                                htmlFor="status-select-menu"
                                className="label-light col-6"
                            >
                                Socket Type:
                            </label>
                            <select
                                id="socketType"
                                name="socketType"
                                onChange={(e) => handleFormInput(e)}
                                required
                                className="col-6"
                            >
                                {!editLight
                                    ? catalogItem.socketType[0]
                                          .split(',')
                                          .map(
                                              (
                                                  ef: string,
                                                  index = ef.indexOf(ef)
                                              ) => {
                                                  return (
                                                      <option
                                                          key={index}
                                                          value={ef}
                                                      >
                                                          {ef}
                                                      </option>
                                                  );
                                              }
                                          )
                                    : editFormat(
                                          catalogItem.socketType,
                                          editLight.socketType
                                      ).map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return (
                                                  <option
                                                      key={index}
                                                      value={ef}
                                                  >
                                                      {ef}
                                                  </option>
                                              );
                                          }
                                      )}
                            </select>
                        </div>
                        <div className="d-flex select-container">
                            <label
                                htmlFor="status-select-menu"
                                className="label-light col-6"
                            >
                                Mounting:
                            </label>
                            <br />
                            <select
                                id="mounting"
                                name="mounting"
                                onChange={(e) => handleFormInput(e)}
                                required
                                className="col-6"
                            >
                                {!editLight
                                    ? catalogItem.mounting[0]
                                          .split(',')
                                          .map(
                                              (
                                                  ef: string,
                                                  index = ef.indexOf(ef)
                                              ) => {
                                                  return (
                                                      <option
                                                          key={index}
                                                          value={ef}
                                                      >
                                                          {ef}
                                                      </option>
                                                  );
                                              }
                                          )
                                    : editFormat(
                                          catalogItem.mounting,
                                          editLight.mounting
                                      ).map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return (
                                                  <option
                                                      key={index}
                                                      value={ef}
                                                  >
                                                      {ef}
                                                  </option>
                                              );
                                          }
                                      )}
                            </select>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="d-flex select-container">
                            <label
                                htmlFor="status-select-menu"
                                className="label-light col-6"
                            >
                                Lens Material
                            </label>
                            <br />
                            <select
                                id="lensMaterial"
                                name="lensMaterial"
                                onChange={(e) => handleFormInput(e)}
                                required
                                className="col-6"
                            >
                                {!editLight
                                    ? catalogItem.lensMaterial[0]
                                          .split(',')
                                          .map(
                                              (
                                                  ef: string,
                                                  index = ef.indexOf(ef)
                                              ) => {
                                                  return (
                                                      <option
                                                          key={index}
                                                          value={ef}
                                                      >
                                                          {ef}
                                                      </option>
                                                  );
                                              }
                                          )
                                    : editFormat(
                                          catalogItem.lensMaterial,
                                          editLight.lensMaterial
                                      ).map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return (
                                                  <option
                                                      key={index}
                                                      value={ef}
                                                  >
                                                      {ef}
                                                  </option>
                                              );
                                          }
                                      )}
                            </select>
                        </div>
                        <div className="d-flex options-container">
                            <label
                                htmlFor="status-select-menu"
                                className="label-light col-6"
                            >
                                Glass Options
                            </label>
                            <br />
                            <select
                                id="glassOptions"
                                name="glassOptions"
                                onChange={(e) => handleFormInput(e)}
                                required
                                className="col-6 options-select"
                            >
                                {!editLight
                                    ? catalogItem.acrylicOptions[0]
                                          .split(',')
                                          .map(
                                              (
                                                  ef: string,
                                                  index = ef.indexOf(ef)
                                              ) => {
                                                  return (
                                                      <option
                                                          key={index}
                                                          value={ef}
                                                      >
                                                          {ef}
                                                      </option>
                                                  );
                                              }
                                          )
                                    : editFormat(
                                          catalogItem.glassOptions,
                                          editLight.glassOptions
                                      ).map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return (
                                                  <option
                                                      key={index}
                                                      value={ef}
                                                  >
                                                      {ef}
                                                  </option>
                                              );
                                          }
                                      )}
                            </select>
                        </div>
                        <div className="d-flex options-container">
                            <label
                                htmlFor="status-select-menu"
                                className="label-light col-6"
                            >
                                Acrylic Options
                            </label>

                            <select
                                id="acrylicOptions"
                                name="acrylicOptions"
                                onChange={(e) => handleFormInput(e)}
                                required
                                className="col-6 options-select"
                            >
                                {!editLight
                                    ? catalogItem.acrylicOptions[0]
                                          .split(',')
                                          .map(
                                              (
                                                  ef: string,
                                                  index = ef.indexOf(ef)
                                              ) => {
                                                  return (
                                                      <option
                                                          key={index}
                                                          value={ef}
                                                      >
                                                          {ef}
                                                      </option>
                                                  );
                                              }
                                          )
                                    : editFormat(
                                          catalogItem.acrylicOptions,
                                          editLight.acrylicOptions
                                      ).map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return (
                                                  <option
                                                      key={index}
                                                      value={ef}
                                                  >
                                                      {ef}
                                                  </option>
                                              );
                                          }
                                      )}
                            </select>
                        </div>
                        <div className="d-flex select-container">
                            <label
                                htmlFor="status-select-menu"
                                className="label-light col-6"
                            >
                                Crystal Type
                            </label>
                            <br />
                            <select
                                id="crystalType"
                                name="crystalType"
                                onChange={(e) => handleFormInput(e)}
                                required
                                className="col-6"
                            >
                                {!editLight
                                    ? catalogItem.crystalType[0]
                                          .split(',')
                                          .map(
                                              (
                                                  ef: string,
                                                  index = ef.indexOf(ef)
                                              ) => {
                                                  return (
                                                      <option
                                                          key={index}
                                                          value={ef}
                                                      >
                                                          {ef}
                                                      </option>
                                                  );
                                              }
                                          )
                                    : editFormat(
                                          catalogItem.crystalType,
                                          editLight.crystalType
                                      ).map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return (
                                                  <option
                                                      key={index}
                                                      value={ef}
                                                  >
                                                      {ef}
                                                  </option>
                                              );
                                          }
                                      )}
                            </select>
                        </div>
                        <div className="d-flex options-container">
                            <label
                                htmlFor="status-select-menu"
                                className="label-light col-6"
                            >
                                Pin Type
                            </label>
                            <select
                                id="pinType"
                                name="pinType"
                                onChange={(e) => handleFormInput(e)}
                                required
                                className="col-6 options-select"
                            >
                                {!editLight
                                    ? catalogItem.exteriorFinish[0]
                                          .split(',')
                                          .map(
                                              (
                                                  ef: string,
                                                  index = ef.indexOf(ef)
                                              ) => {
                                                  return (
                                                      //change this line for production
                                                      <option
                                                          key={index}
                                                          value={ef}
                                                      >
                                                          {ef}
                                                      </option>
                                                  );
                                              }
                                          )
                                    : editFormat(
                                          catalogItem.exteriorFinish,
                                          editLight.crystalPinType
                                      ).map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return (
                                                  //change this line for production
                                                  <option
                                                      key={index}
                                                      value={ef}
                                                  >
                                                      {ef}
                                                  </option>
                                              );
                                          }
                                      )}
                            </select>
                        </div>
                        <div className="d-flex options-container">
                            <label
                                htmlFor="status-select-menu"
                                className="label-light col-6"
                            >
                                Pin Color
                            </label>
                            <br />
                            <select
                                id="pinColor"
                                name="pinColor"
                                onChange={(e) => handleFormInput(e)}
                                required
                                className="col-6 options-select"
                            >
                                {!editLight
                                    ? catalogItem.exteriorFinish[0]
                                          .split(',')
                                          .map(
                                              (
                                                  ef: string,
                                                  index = ef.indexOf(ef)
                                              ) => {
                                                  return (
                                                      //change this line for production
                                                      <option
                                                          key={index}
                                                          value={ef}
                                                      >
                                                          {ef}
                                                      </option>
                                                  );
                                              }
                                          )
                                    : editFormat(
                                          catalogItem.exteriorFinish,
                                          editLight.crystalPinColor
                                      ).map(
                                          (
                                              ef: string,
                                              index = ef.indexOf(ef)
                                          ) => {
                                              return (
                                                  //change this line for production
                                                  <option
                                                      key={index}
                                                      value={ef}
                                                  >
                                                      {ef}
                                                  </option>
                                              );
                                          }
                                      )}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="d-flex col-12 button-container justify-content-end align-items-center">
                    <button
                        type="button"
                        className="qty-button"
                        onClick={() => {
                            setCount(count + 1);
                            setCatalogDetails({
                                ...catalogDetails,
                                quantity: count + 1,
                            });
                        }}
                    >
                        +
                    </button>
                    <h3>{count}</h3>
                    <button
                        type="button"
                        className="qty-button"
                        onClick={() => {
                            count > 1 ? setCount(count - 1) : setCount(1);
                            count > 1
                                ? setCatalogDetails({
                                      ...catalogDetails,
                                      quantity: count - 1,
                                  })
                                : setCount(1);
                        }}
                    >
                        -
                    </button>
                    <button className="submit-button" type="submit">
                        Add To Room
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CatalogItem;
