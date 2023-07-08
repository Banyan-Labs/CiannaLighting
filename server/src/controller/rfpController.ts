import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import Project from "../model/Project";
import { uploadFunc } from "../middleware/s3";
import RFP from "../model/RFP";
import ProposalTableRow from "../model/ProposalTableRow";
import rfpDocInterface, {
  PropTableRow,
  Room,
} from "../interfaces/rfpDocInterface";

const createRfp = async (req: Request, res: Response, next: NextFunction) => {
  const {
    header,
    projectId,
    clientId,
    schedule,
    scope,
    bid,
    submittals,
    qualityStandards,
    contactInfo,
  } = req.body;
  let { images, pdf } = req.body; // []/s3
  const documents = Object.values(req.files as any);

  const results: any = await uploadFunc(documents);
  images = [];
  pdf = [];

  if (results?.length) {
    for (let i = 0; i < results?.length; i++) {
      for (let j = 0; j < results[i].length; j++) {
        const singleDoc = await results[i][j];

        if (singleDoc.field === "images") {
          images.push(singleDoc.s3Upload.Location);
        } else if (singleDoc.field === "pdf") {
          pdf.push(singleDoc.s3Upload.Location);
        }
      }
    }
  }
  const rfp = new RFP({
    _id: new mongoose.Types.ObjectId(),
    header,
    projectId,
    clientId,
    schedule,
    scope,
    bid,
    submittals,
    qualityStandards,
    contactInfo,
    images,
    pdf,
  });
  const rfpAndProject = await Project.findByIdAndUpdate({ _id: projectId })
    .exec()
    .then((project) => {
      if (project) {
        project.rfp = rfp._id;
        project.save();

        const projectSuccess = `added rfp to project: ${projectId}`;
        return rfp
          .save()
          .then((rfp) => {
            return res.status(201).json({
              rfp,
              projectSuccess,
            });
          })
          .catch((error) => {
            return res.status(500).json({
              message: error.message,
              error,
            });
          });
      } else {
        next();
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });

  return rfpAndProject;
};

const findRFP = async (req: Request, res: Response) => {
  const keys = Object.keys(req.body).filter((key: string) => key != "_id");
  const parameters = Object.fromEntries(
    keys.map((key: string) => [key, req.body[key.toString()]])
  );

  return await RFP.findOne({ _id: req.body._id })
    .exec()
    .then((rfp: any) => {
      if (rfp && keys.length) {
        keys.map((keyName: string) => {
          rfp[keyName] = parameters[keyName];
        });
      } else if (!rfp) {
        return res.status(204).json( { message: `No RFP found using _id of #${req.body._id}.` } );
      }

      return res.status(200).json({
        rfp,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

const getAccountRFPS = async (req: Request, res: Response) => {
  return await RFP.find({ clientId: req.body.clientId })
    .exec()
    .then((rfp) => {
      return res.status(200).json({
        rfp,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

const propNameExchange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  type RequestBody = {
    type: string;
    name: string;
    region: string;
    newName: string;
    projectId: string;
    projectRegion: string;
  };
  const { type, name, newName, projectId, projectRegion, region }: RequestBody = req.body;

  if (type === "project") {
    const rfp: rfpDocInterface | null = await RFP.findOne({ projectId });

    if (rfp) {
      const checkName = rfp.header.split(", ");
      if (checkName[0] === name || checkName[1] === projectRegion) {
        rfp.header = `${checkName[0] !== newName ? newName : checkName[0]}, ${checkName[1] !== region ? region : checkName[1]}`;
        try {
          const done = await rfp.save();
          if (done) {
            return res.status(200).json({
              done,
              message: "RFP header updated successfully",
            });
          } else {
            next();
          }
        } catch (error) {
          return res.status(400).json({
            error,
            message: "RFP Header update failed.",
          });
        }
      }
    } else {
      return res.status(204).json( { message: `No RFP found using projectId of #${projectId}.` } );
    }
  } else if (type === "room") {
    const proposals: PropTableRow[] | [] | null = await ProposalTableRow.find({
      projectId,
    });

    if (proposals) {
      try {
        proposals.forEach(async (item: any) => {
          if (item.rooms) {
            const newRooms: Room[] = item.rooms.map(
              (room: Room, index: number) => {
                if (room.name === name) {
                  return { name: newName, lightNumber: room.lightNumber };
                } else {
                  return room;
                }
              }
            );
            item.rooms = newRooms;
          }

          await item.save();

          return item;
        });

        return res.status(200).json({
          proposals,
          message: 'Room Update successful'
        });
      } catch (error) {
        return res.status(400).json({
          error,
          message: "Room update failed.",
        });
      }
    } else {
      return res.status(204).json( { message: `No proposals found using projectID of #${projectId}.` } );
    }
  } else {
    throw new Error('Error in propNameExchange.')
  }
};
const rfpEditor = async (req: Request, res: Response) => {
  const {
    lightID,
    exteriorFinish,
    interiorFinish,
    lensMaterial,
    glassOptions,
    acrylicOptions,
    roomName,
    quantity,
    totalWatts,
    totalLumens,
  } = req.body;
  const finishes: any = {
    exteriorFinish: exteriorFinish,
    interiorFinish: interiorFinish,
    lensMaterial: lensMaterial,
    glassOptions: glassOptions,
    acrylicOptions: acrylicOptions,
  };
  const check = ProposalTableRow.findOne({ lightID: lightID })
    .exec()
    .then(async (prop: any) => {
      if (prop) {
        const checkQuantity = prop.lightQuantity;
        const originalQuantity = prop.rooms.find(
          (room: any) => room.name == roomName
        ).lightNumber;
        const newQuantity = prop.lightQuantity - originalQuantity + quantity;
        const newWatts = totalWatts * newQuantity;
        const newLumens = totalLumens * newQuantity;
        const newRooms =
          prop.rooms.length > 1
            ? [
              ...prop.rooms.filter(
                (item: any) =>
                  item.name == roomName &&
                  item.lightNumber == originalQuantity
              ),
              { name: roomName, lightNumber: quantity },
            ]
            : [{ name: roomName, lightNumber: quantity }];
        let runCheck = [];
        let rowFinishes: any = prop.finishes;

        for (let key in rowFinishes) {
          runCheck.push(rowFinishes[key] == finishes[key]);
        }

        if (runCheck.some((item) => item == false)) {
          prop.finishes = finishes;
        }
        prop.lightQuantity = newQuantity;
        prop.totalWatts = newWatts;
        prop.totalLumens = newLumens;
        console.log("Prop rooms before reasigning: ", prop.rooms);
        console.log("newRooms Variable: ", newRooms);
        prop.rooms = newRooms;
        console.log("propRooms after reasigning: ", prop.rooms)

        return await prop
          .save()
          .then(async (propSaved: any) => {
            if (propSaved) {
              console.log("PropRooms after saving: ", propSaved.rooms)
              if (propSaved.sub && checkQuantity != quantity) {
                await ProposalTableRow.findOne({ _id: prop.sub })
                  .then(async (outer) => {
                    if (outer) {
                      const newQuantity =
                        outer.lightQuantity - checkQuantity + quantity;
                      outer.lightQuantity = newQuantity;
                      const done = await outer.save();

                      if (done) {
                        return res.status(200).json({
                          inner: propSaved,
                          outer: outer,
                          message: "Updated proposal rows.",
                        });
                      }
                    }
                  })
                  .catch((error: any) => {
                    return res.status(500).json({
                      error,
                    });
                  });
              } else {
                return res.status(200).json({
                  propSaved,
                  message: "Updated inner row.",
                });
              }
            }
          })
          .catch((error: any) => {
            return res.status(500).json({
              error,
            });
          });
      }
    });

  return check;
};

const deleteProp = async (req: Request, res: Response) => {
  const { lightID } = req.body;
  const checkAndDelete = await ProposalTableRow.findOneAndDelete({
    lightID: lightID,
  }).then(async (prop) => {
    if (prop) {
      if (prop.sub?.length) {
        await ProposalTableRow.findOne({ _id: prop.sub })
          .then(async (outer: any) => {
            if (outer) {
              const newQuantity = outer.lightQuantity - prop.lightQuantity;
              const newWatts = prop.wattsPer * prop.numberOfLamps * newQuantity;
              const newLumens =
                (outer.totalLumens / outer.lightQuantity) * newQuantity;
              const newSubTable = outer.subTableRow.filter(
                (id: any) => id !== String(prop._id)
              );
              const newRooms = outer.rooms.filter(
                (room: any) => room.name !== prop.rooms[0].name
              );

              outer.rooms = newRooms;
              outer.lightQuantity = newQuantity;
              outer.totalWatts = newWatts;
              outer.totalLumens = newLumens;
              outer.subTableRow = newSubTable;

              const done = await outer.save();

              if (done) {
                return res.status(200).json({
                  done,
                  message: "Successfully updated and deleted props.",
                });
              } else {
                return res.status(500).json({
                  message: "Error in deleting props"
                })
              }
            }
          })
          .catch((error: any) => {
            return res.status(500).json({
              error,
            });
          });
      } else if (prop.subTableRow && prop.subTableRow.length) {
        await ProposalTableRow.findOne({ _id: prop.subTableRow[0] })
          .then(async (resetProp: any) => {
            if (resetProp) {
              const originalQuantitySUB = prop.lightQuantity - prop.rooms[0].lightNumber;
              const newRooms = prop.rooms.slice(1);
              const newSubTable = prop.subTableRow.length > 1 ? prop.subTableRow.slice(1) : [];
              resetProp.lightQuantity = originalQuantitySUB;
              resetProp.rooms = newRooms;
              resetProp.subTableRow = newSubTable;
              resetProp.sub = "";
              const doneTop = await resetProp.save();

              if (doneTop) {
                const rfpUpdated = await RFP.findOne({
                  projectId: prop.projectId,
                });

                if (rfpUpdated) {
                  const filteredRow = rfpUpdated.tableRow.filter(
                    (proposal) => proposal !== String(prop._id)
                  );
                  const newRow = [String(resetProp._id), ...filteredRow];
                  rfpUpdated.tableRow = newRow;
                  const savedRFP = await rfpUpdated.save();

                  if (savedRFP) {
                    const updateInner = await ProposalTableRow.updateMany(
                      { _id: { $in: newSubTable } },
                      { $set: { sub: resetProp._id } },
                      { multi: true }
                    );

                    if (updateInner) {
                      return res.status(200).json({
                        doneTop,
                        updateInner,
                        message: "Updated all levels and deleted.",
                      });
                    }
                  }
                }
              }
            }
          })
          .catch((error: any) => {
            return res.status(500).json({
              error,
            });
          });
      } else {
        const rfpUpdated = await RFP.findOne({ projectId: prop.projectId });
        if (rfpUpdated) {
          const filteredRow = rfpUpdated.tableRow.filter(
            (proposal) => proposal !== String(prop._id)
          );
          rfpUpdated.tableRow = filteredRow;
          const savedRFP = await rfpUpdated.save();

          if (savedRFP) {
            return res.status(200).json({
              prop,
              message: "Deleted succesfully.",
            });
          }
        }
      }
    } else {
      return res.status(204).json( { message: `No proposals found using lightID of #${lightID}.`} );
    }
  });

  if (checkAndDelete) return checkAndDelete;
};

const rfpUpdater = async (req: Request, res: Response) => {
  const {
    item_ID,
    lightID,
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
    propID,
  } = req.body.light;
  const finishes: any = {
    exteriorFinish: exteriorFinish,
    interiorFinish: interiorFinish,
    lensMaterial: lensMaterial,
    glassOptions: glassOptions,
    acrylicOptions: acrylicOptions,
  };
  const proposal = new ProposalTableRow({
    _id: new mongoose.Types.ObjectId(),
    sub: propID ? propID : "",
    itemID: item_ID,
    lightID,
    projectId,
    description,
    lampType,
    lampColor,
    price,
    lightQuantity: quantity,
    wattsPer,
    totalWatts: totalWatts * quantity,
    numberOfLamps,
    totalLumens: totalLumens * quantity,
    finishes,
    rooms: [{ name: roomName, lightNumber: quantity }],
    subTableRow: [],
  });

  if (propID) {
    const updateProp: any = await ProposalTableRow.findByIdAndUpdate({
      _id: propID,
    }).exec()
      .then(async (propFound) => {
        if (propFound) {
          let runCheck = [];
          let rowFinishes: any = propFound.finishes;
          const sameRoom = propFound.rooms
            .map((room: any) => room.name)
            .indexOf(roomName);
          if (sameRoom == -1) {
            const subs = propFound.subTableRow;
            propFound.subTableRow = [...subs, String(proposal._id)];
            await proposal.save();
          } else {
            for (let key in rowFinishes) {
              runCheck.push(rowFinishes[key] == finishes[key]);
            }
            if (runCheck.some((item) => item == false)) {
              const subs = propFound.subTableRow;
              if (subs) {
                propFound.subTableRow = [...subs, String(proposal._id)];
              }
              await proposal.save();
            }
          }
          const newQuantity = propFound.lightQuantity + quantity;
          const newWattage = totalWatts * newQuantity;
          const newTotalLumens = totalLumens * newQuantity;
          const roomFind = propFound.rooms.find(
            (room) => room.name == roomName
          );
          const roomFilter = propFound.rooms.filter(
            (room) => room.name != roomName
          );
          const newRooms =
            sameRoom == -1
              ? [...propFound.rooms, { name: roomName, lightNumber: quantity }]
              : [
                ...roomFilter,
                {
                  name: roomFind?.name,
                  lightNumber: roomFind?.lightNumber + quantity,
                },
              ];
          propFound.lightQuantity = newQuantity;
          propFound.totalWatts = newWattage;
          propFound.totalLumens = newTotalLumens;
          propFound.rooms = newRooms;
          const done = await propFound.save();
          if (done) {
            return res.status(200).json({
              message: "Successful Update",
              done,
            });
          }
        } else {
          return res.status(204).json( { message: `No proposals found using _id of #${propID}.` } );;
        }
      })
      .catch((error: any) => {
        return {
          message: error.message,
        };
      });

    return updateProp;
  } else {
    const updateRfp = await RFP.findOne({ projectId: projectId })
      .exec()
      .then(async (rfp) => {
        if (rfp) {
          await proposal.save();

          const newRow = [String(proposal._id), ...rfp.tableRow];
          rfp.tableRow = newRow;
          const done = await rfp.save();

          if (done) {
            return res.status(200).json({
              message: "Successful Add",
              done,
            });
          }
        } else {
          return res.status(204).json( { message: `No RFP found using projectID of #${projectId}.` } );
        }
      })
      .catch((error: any) => {
        return res.status(500).json({ message: error.message, error });
      });

    return updateRfp;
  }
};

const getProposalRows = async (req: Request, res: Response) => {
  return await ProposalTableRow.find({ projectId: req.body.projectId })
    .exec()
    .then((proposal) => {
      return res.status(200).json({
        message: "Proposal Rows Found",
        proposal,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

const getRFPS = async (req: Request, res: Response) => {
  return await RFP.find({ projectId: req.body.projectId })
    .exec()
    .then((rfp) => {
      return res.status(200).json({
        message: "RFP Found",
        rfp,
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

const deleteRFP = async (req: Request, res: Response, next: NextFunction) => {
  return await Project.findByIdAndUpdate({ _id: req.body.projectId })
    .exec()
    .then(async (project) => {
      if (project) {
        project.rfp = "";
        project.save();
        const rfpRemoved = "rfp removed successfully from project";

        return await RFP.findByIdAndDelete({ _id: req.body._id })
          .then((rfp) => {
            return !rfp
              ? res.status(200).json({
                rfp,
              })
              : res.status(404).json({
                message:
                  "The rfp document you are looking for no longer exists",
                rfpRemoved,
              });
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      } else {
        return res.status(204).json( { message: `No project found using _id of #${req.body._id}.` } );
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

export default {
  createRfp,
  getRFPS,
  getAccountRFPS,
  findRFP,
  deleteRFP,
  rfpEditor,
  rfpUpdater,
  deleteProp,
  getProposalRows,
  propNameExchange
};
