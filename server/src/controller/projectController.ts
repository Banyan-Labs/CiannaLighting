import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import LightSelection from "../model/LIghtSelection";
import lightSelectionController, { lightIdService } from "./lightSelectionController";
import ProposalTableRow from "../model/ProposalTableRow";
import Project from "../model/Project";
import Room from "../model/Room";
import RFP from "../model/RFP";

const createProject = async (req: Request, res: Response) => {
  const {
    _id,
    name,
    description,
    clientId,
    clientName,
    region,
    status,
    lightIDs,
    rooms,
    copy,
  } = req.body;
  let curDate = new Date().toISOString().split("T")[0].split("-");
  /**
   * If you are copying an instance of someone elses project or room, you have to pass in the userId, not the project clientId
   */
  /**
   *
   *
   *  need to include in copying a room instead of just the light
   *
   *
   *
   */

  if (_id && copy === "room") {
    Room.findOne({ _id: rooms[0] })
      .then(async (foundRoom) => {
        await runRoom(foundRoom, _id, clientId, copy);
        return res.status(201).json({
          message: rooms[0],
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: error.message,
          error,
        });
      });
  } else {
    const rfp = new RFP({
      _id: new mongoose.Types.ObjectId(),
      header: `${copy === "project" ? "Copy of " + name : name}, ${region}`,
      clientId: clientId,
      projectId: "",
      clientName: clientName,
      tableRow: [],
    });

    const project = new Project({
      _id: new mongoose.Types.ObjectId(),
      archived: false,
      name: copy === "project" ? `Copy of ${name}` : name,
      clientId: clientId,
      clientName: clientName,
      region: region,
      status: status,
      description: description,
      rfp: String(rfp._id),
      rooms: [],
      lightIDs: copy === "project" ? lightIDs : [],
      activity: {
        createUpdate: `Created on ${[curDate[1], curDate[2], curDate[0]].join(
          "/"
        )}`,
        rooms: [],
        archiveRestore: [],
        status: [
          [
            `Status: ${status}`,
            `${[curDate[1], curDate[2], curDate[0]].join("/")}`,
          ],
        ],
      },
    });
    rfp.projectId = project._id;
    await rfp.save();
    return await project
      .save()
      .then(async (project) => {
        if (project) {
          project.rfp = String(rfp._id);
          if (_id && copy === "project") {
            let i = 0;
            if (project) {
              while( i < rooms.length) {
                await Room.findOne({ _id: rooms[i] })
                  .then(async (foundRoom) => {
                    await runRoom(foundRoom, project._id, clientId, copy);
                    i++
                  })
                  .catch((error) => {
                    res.status(500).json({
                      error,
                    });
                  });
              }
            if(i === rooms.length){
              return res.status(201).json({
                project,
                message: `copy of project ${_id}`,
              });
            }
            }
          } else {
            return res.status(201).json({
              project,
            });
          }
        }
      })
      .catch((error) => {
        return res.status(500).json({
          message: error.message,
          error,
        });
      });
  }
};

const getProject = async (req: Request, res: Response, next: NextFunction) => {
  const keys = Object.keys(req.body).filter(
    (key: string) => key != "_id" && key != "authEmail" && key != "authRole"
  );
  const parameters = Object.fromEntries(
    keys.map((key: string) => [key, req.body[key.toString()]])
  );
  const curDate = new Date().toISOString().split("T")[0].split("-");
  return await Project.findOne({ _id: req.body._id })
    .exec()
    .then(async (project) => {
      if (project) {
        if (project && project.activity == undefined) {
          project["activity"] = {
            createUpdate: `Created on ${[
              curDate[1],
              curDate[2],
              curDate[0],
            ].join("/")}`,
            rooms: [],
            archiveRestore: [],
            status: [
              [
                `Status: ${project.status}`,
                `${[curDate[1], curDate[2], curDate[0]].join("/")}`,
              ],
            ],
          };
        }
        if (keys.length) {
          keys.map((keyName: string) => {
            switch (keyName) {
              case "name":
                project.name = parameters["name"];
                break;
              case "archived":
                project.archived = parameters["archived"];
                break;
              case "region":
                project.region = parameters["region"];
                break;
              case "status":
                project.status = parameters["status"];
                project.activity = {
                  ...project.activity,
                  status: [
                    [
                      `Status: ${parameters["status"]}`,
                      `${[curDate[1], curDate[2], curDate[0]].join("/")}`,
                    ],
                    ...project.activity.status,
                  ],
                };
                break;
              case "description":
                project.description = parameters["description"];
                break;
              case "activityClear":
                project.activity.rooms = parameters["activityClear"];
                project.activity.archiveRestore = parameters["activityClear"];
                break;
              case "activity":
                project.activity = {
                  ...project.activity,
                  archiveRestore: project.activity.archiveRestore
                    ? [
                        [
                          `Project ${parameters["activity"]}ed`,
                          `${[curDate[1], curDate[2], curDate[0]].join("/")}`,
                        ],
                        ...project.activity.archiveRestore,
                      ]
                    : [
                        [
                          `Project ${parameters["activity"]}ed`,
                          `${[curDate[1], curDate[2], curDate[0]].join("/")}`,
                        ],
                      ],
                };
                break;
              default:
                null;
            }
          });
          if (project.activity) {
            project.activity = {
              ...project.activity,
              createUpdate: `Updated on ${[
                curDate[1],
                curDate[2],
                curDate[0],
              ].join("/")}`,
            };
          }
        }
        project.save();
        return res.status(200).json({
          project,
        });
      } else {
        next();
      }
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};
const runRoom = async (room: any, newProjectId: string, clientId: string, copy:string):Promise<void> => {
  const { name, description, lights } = room;
  /**
   * Need to include lideSelectionService in here and update the information
   * from the front end to send the itemIDS from the front end of each light in the room being copied.
   *
   */

  const newRoom = new Room({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    clientId: clientId,
    projectId: newProjectId,
    description: description,
    lights: [],
  });
  const roomAndProject = await Project.findOne({ _id: newProjectId });
  let curDate = new Date().toISOString().split("T")[0].split("-");
  if (roomAndProject) {
    roomAndProject.activity = {
      ...roomAndProject.activity,
      rooms: [
        [
          `${room.name.toUpperCase()} copied and created new roomID: ${
            newRoom._id
          }.`,
          `${[curDate[1], curDate[2], curDate[0]].join("/")}`,
        ],
        ...roomAndProject.activity.rooms,
      ],

      createUpdate: `Updated on ${[curDate[1], curDate[2], curDate[0]].join(
        "/"
      )}`,
    };
    roomAndProject.rooms = [...roomAndProject.rooms, newRoom._id];
    await roomAndProject.save();
  }

  await newRoom.save().then(async (room) => {
    if (room) {
      for (let i = 0; i < lights.length; i++) {
        console.log("lights and index", lights, i, lights[i] )
        await LightSelection.findOne({ _id: lights[i] }).then(async (light) => {
        await runLights(light, room._id, room.projectId, clientId, copy);
        });
      }
      return room
    }
  });
};

const runLights = async (
  light: any,
  newRoomId: string,
  newProjectId: string,
  clientId: string,
  copy: string
) => {
  const newLight = new LightSelection({
    _id: new mongoose.Types.ObjectId(),
    item_ID: light.item_ID,
    exteriorFinish: light.exteriorFinish,
    interiorFinish: light.interiorFinish,
    lensMaterial: light.lensMaterial,
    glassOptions: light.glassOptions,
    acrylicOptions: light.acrylicOptions,
    environment: light.environment,
    safetyCert: light.safetyCert,
    projectVoltage: light.projectVoltage,
    socketType: light.socketType,
    mounting: light.mounting,
    crystalType: light.crystalType,
    crystalPinType: light.crystalPinType,
    crystalPinColor: light.crystalPinColor,
    roomName: light.roomName,
    roomId: newRoomId,
    projectId: newProjectId,
    clientId: clientId,
    quantity: light.quantity,
    price: light.price,
    description: light.description,
    lampType: light.lampType,
    lampColor: light.lampColor,
    wattsPer: light.wattsPer,
    totalWatts: light.totalWatts,
    numberOfLamps: light.numberOfLamps,
    totalLumens: light.totalLumens,
  });

  const lightAndRoom = await Room.findOne({ _id: newRoomId });

  if (lightAndRoom) {
    lightAndRoom.lights = [...lightAndRoom.lights, newLight._id];    
    return await lightAndRoom
      .save()
      .then(async (room) => {
        const newlight = await newLight.save();
        ///////
        /**
         * gonna work here, going to have to find a way to conditionally add the propID ( compare with the add Proposal stuff)
         */
        //////
        if (newlight) {
          const {
            item_ID,
            exteriorFinish,
            interiorFinish,
            lensMaterial,
            glassOptions,
            acrylicOptions,
            roomName,
            projectId,
            quantity,
            description,
            lampType,
            lampColor,
            price,
            wattsPer,
            totalWatts,
            numberOfLamps,
            totalLumens,
          } = newlight;
          if(copy === 'room'){
            console.log("item id in roomCopyIDservice: ", item_ID, roomName)
            await lightIdService(projectId, 'add', item_ID, roomName);
          }

          const finishes: any = {
            exteriorFinish: exteriorFinish,
            interiorFinish: interiorFinish,
            lensMaterial: lensMaterial,
            glassOptions: glassOptions,
            acrylicOptions: acrylicOptions,
          };
          const propID = await ProposalTableRow.findOne({
            itemID: item_ID,
            sub: "",
            projectId: projectId,
          });
          const proposal = new ProposalTableRow({
            _id: new mongoose.Types.ObjectId(),
            sub: propID ? propID._id : "",
            itemID: item_ID,
            lightID: String(newLight._id),
            projectId: projectId,
            description: description,
            lampType: lampType,
            lampColor: lampColor,
            price: price,
            lightQuantity: quantity,
            wattsPer: wattsPer,
            totalWatts: totalWatts * quantity,
            numberOfLamps: numberOfLamps,
            totalLumens: totalLumens * quantity,
            finishes: finishes,
            rooms: [{ name: roomName, lightNumber: quantity }],
            subTableRow: [],
          });
          if (propID) {
            console.log("propID or updating current proposal row?: ", propID)
            let runCheck = [];
            let rowFinishes: any = propID.finishes;
            const sameRoom = propID.rooms
              .map((room: any) => room.name)
              .indexOf(roomName);
            if (sameRoom == -1) {
              const subs = propID.subTableRow;
              propID.subTableRow = [...subs, String(proposal._id)];
              await proposal.save();
            } else {
              for (let key in rowFinishes) {
                runCheck.push(rowFinishes[key] == finishes[key]);
              }
              if (runCheck.some((item) => item == false)) {
                const subs = propID.subTableRow;
                if (subs) {
                  propID.subTableRow = [...subs, String(proposal._id)];
                }
                await proposal.save();
              }
            }
            const newQuantity = propID.lightQuantity + quantity;
            const newWattage = totalWatts * newQuantity;
            const newTotalLumens = totalLumens * newQuantity;
            const roomFind = propID.rooms.find(
              (room: any) => room.name == roomName
            );
            const roomFilter = propID.rooms.filter(
              (room: any) => room.name != roomName
            );
            const newRooms: any =
              sameRoom == -1
                ? [...propID.rooms, { name: roomName, lightNumber: quantity }]
                : [
                    ...roomFilter,
                    {
                      name: roomFind?.name,
                      lightNumber: roomFind
                        ? roomFind.lightNumber + quantity
                        : quantity,
                    },
                  ];
            propID.lightQuantity = newQuantity;
            propID.totalWatts = newWattage;
            propID.totalLumens = newTotalLumens;
            propID.rooms = newRooms;
            const done = await propID.save();
            if (done) {
              return {
                message: "Successful Update",
                done,
              };
            }
          } else {
            const updateRfp = await RFP.findOne({ projectId: projectId })
              .exec()
              .then(async (rfp) => {
                if (rfp) {
                  console.log("RFP in Update rfp: ", rfp)
                  await proposal.save();
                  const newRow = [String(proposal._id), ...rfp.tableRow];
                  rfp.tableRow = newRow;
                  const done = await rfp.save();
                  if (done) {
                    return {
                      message: "Successful Add",
                      done,
                    };
                  }
                }
              })
              .catch((error: any) => {
                return { message: error.message, error };
              });
            return updateRfp;
          }
        }
      })
      .catch((error) => {
        return error;
      });
  }
};

const getAccountProjects = async (req: Request, res: Response) => {
  return await Project.find({ clientId: req.body.clientId })
    .exec()
    .then((projects) => {
      return res.status(200).json({
        projects,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

const getAllProjects = async (req: Request, res: Response) => {
  const check = Object.keys(req.body).filter(
    (x) => x != "authEmail" && x != "authRole" && x != "clientId" && x != "type"
  );
  const security = check.filter(
    (x) => x === "status" || x === "region" || x === "clientName"
  );

  const workingUpdate = Object.fromEntries(
    security.map((x) => [x, req.body[x]])
  );

  if (security.length && check.length === security.length) {
    await Project.find({ ...workingUpdate })
      .then(async (projects) => {
        const { type, clientId } = req.body;
        const indProj = projects.filter((x) => x.clientId === clientId);

        // if filtering through only user project
        const filterProj = (await type) === "allProjects" ? projects : indProj;
        return res.status(200).json({
          filterProj,
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message, error });
      });
  } else {
    await Project.find()
      .then((projects) => {
        return res.status(200).json({
          projects,
        });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message, error });
      });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  // when rfpDocs are created, still need to include.
  return await Project.findByIdAndDelete({ _id: req.body._id })
    .then(async (project) => {
      if (project && project.rooms.length) {
        await Room.deleteMany({ projectId: req.body._id })
          .exec()
          .then((res) => {
            return res.deletedCount;
          })
          .catch((err) => {
            return err.message;
          });
        await LightSelection.deleteMany({ projectId: req.body._id })
          .exec()
          .then((res) => {
            return res.deletedCount;
          })
          .catch((err) => {
            return err.message;
          });
      }

      return !project
        ? res.status(200).json(project)
        : res.status(404).json({
            message: "The Project you are looking for no longer exists",
          });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

export default {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  getAccountProjects,
};
