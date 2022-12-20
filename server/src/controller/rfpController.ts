import { NextFunction, Request, Response } from "express";
import mongoose, { Mongoose } from "mongoose";
import Project from "../model/Project";
import { uploadFunc } from "../middleware/s3";
import RFP from "../model/RFP";
import ProposalTableRow from "../model/ProposalTableRow";

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

  const results = await uploadFunc(documents);
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
const rfpEditor = async (req: Request, res: Response) => {
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
  } = req.body;
  console.log("PROP EDIT BOD!!!!!!: ",req.body);
  const finishes: any = {
    exteriorFinish: exteriorFinish,
    interiorFinish: interiorFinish,
    lensMaterial: lensMaterial,
    glassOptions: glassOptions,
    acrylicOptions: acrylicOptions,
  };
  const editObject: any = {
    rooms: [{name: roomName, lightNumber: quantity}],
    lightQuantity: quantity,
    totalWatts: totalWatts * quantity,
    totalLumens: totalLumens * quantity,
    finishes: finishes,
  };
  console.log("####LIGHTID####: ",lightID)
  console.log("Body: ",req.body)
  const check = ProposalTableRow.findOne({ lightID: lightID })
    .exec()
    .then(async (prop: any) => {
      if (prop) {
        const checkQuantity = prop.lightQuantity;
        console.log("found prop###########: ", prop)
        const originalQuantity = prop.rooms.find((room: any)=> room.name == roomName).lightNumber
        const newQuantity = (prop.lightQuantity - originalQuantity) + quantity;
        const newWatts = totalWatts * newQuantity;
        const newLumens = totalLumens * newQuantity;
        const newRooms = prop.rooms.length > 1 ? [...prop.rooms.filter((item: any)=> item.name == roomName && item.lightNumber == originalQuantity), {name: roomName, lightNumber: quantity}] : [{name: roomName, lightNumber: quantity}];
        let runCheck = [];
        let rowFinishes: any = prop.finishes;
        for (let key in rowFinishes) {
            console.log("key in rowFinishes: ", key);
            runCheck.push(rowFinishes[key] == finishes[key]);
        }
          if (runCheck.some((item) => item == false)) {
            prop.finishes = finishes;
          }
          prop.lightQuantity = newQuantity;
          prop.totalWatts = newWatts;
          prop.totalLumens = newLumens;
          prop.rooms = newRooms;
      
       
        return await prop
          .save()
          .then(async (propSaved: any) => {
            if (propSaved) {
              if (propSaved.sub && checkQuantity != quantity) {
                await ProposalTableRow.findOne({ _id: prop.sub })
                  .then(async (outer) => {
                    if (outer) {
                      console.log("second level (outer prop)#####: ", outer)
                      console.log("OQ: ", outer.lightQuantity)
                      const newQuantity = (outer.lightQuantity - checkQuantity) + quantity;
                      console.log("NQ: ", newQuantity)
                      outer.lightQuantity = newQuantity;
                      const done = await outer.save();
                      console.log("DONE BEFORE CONDITIONAL: ", done)
                      if (done) {
                        console.log("```` updated multi Row ````: ", done);
                        return res.status(200).json({
                          inner: propSaved,
                          outer: outer,
                          message: "Updated proposal rows.",
                        });
                      }
                    }
                  })
                  .catch((error: any) => {
                    console.log("````error in multi update````");
                    return res.status(500).json({
                      error,
                    });
                  });
              } else {
                console.log("`````updated one row`````");
                return res.status(200).json({
                  propSaved,
                  message: "Updated inner row.",
                });
              }
            }
          })
          .catch((error: any) => {
            console.log("`````error in single update`````");
            return res.status(500).json({
              error,
            });
          });
      }
});
    return check;
};

const deleteProp = async (req: Request, res: Response) => {
const {lightID} = req.body;
console.log("LIGHTID IN DELETEPROP: ", lightID)

const checkAndDelete = await ProposalTableRow.findOneAndDelete({lightID: lightID}).then(async(prop)=>{
  if(prop){
  if(prop.sub && prop.sub.length){
    await ProposalTableRow.findOne({_id: prop.sub}).then(async(outer: any)=>{
      if(outer){
      
      const newQuantity = outer.lightQuantity  - prop.lightQuantity;
      const newWatts = (prop.wattsPer * prop.numberOfLamps) * newQuantity;
      const newLumens = (outer.totalLumens / outer.lightQuantity) * newQuantity;
      console.log('SUB-ID: ', outer.subTableRow, prop._id);
      const newSubTable = outer.subTableRow.filter((id:any)=> id !== String(prop._id));
      console.log("NEW ST ", newSubTable)
      const newRooms = outer.rooms.filter((room:any)=> room.name !== prop.rooms[0].name);
      
      outer.rooms = newRooms;
      outer.lightQuantity = newQuantity;
      outer.totalWatts = newWatts;
      outer.totalLumens = newLumens;
      outer.subTableRow = newSubTable;
      
      const done = await outer.save();
      
      if(done){
        return res.status(200).json({
          done,
          message: "Successfully updated and deleted props."
        })
      }
    }
    })
    
  }else if (prop.subTableRow && prop.subTableRow.length){
    await ProposalTableRow.findOne({_id: prop.subTableRow[0]}).then(async(resetProp:any)=>{
      if(resetProp){
      const originalQuantitySUB = prop.lightQuantity - prop.rooms[0].lightNumber;
      
      const newRooms = prop.rooms.slice(1);
      
      const newSubTable = prop.subTableRow.slice(1);
      
      resetProp.lightQuantity = originalQuantitySUB;
      resetProp.rooms = newRooms;
      resetProp.subTableRow = newSubTable;
      resetProp.sub = "";
      const doneTop = await resetProp.save();
      if(doneTop){
        
      const updateInner = await ProposalTableRow.updateMany(
        { _id: { $in: newSubTable } },
        { $set: { sub: resetProp._id} },
        {multi: true}
     )
     
     if(updateInner){
      return res.status(200).json({
        doneTop,
        updateInner,
        message: "Updated all levels and deleted."
      })
     }
      }}
    })
  
  }else{
    console.log("ONLY PROP@@@@@")
    return res.status(200).json({
      prop,
      message: "Deleted succesfully."
    })
  }

}
})
return checkAndDelete

}

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
  console.log("$$$$$$$$$$$$$$$ PROP ID: ", propID);
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
  await proposal.save();
  if (propID) {
    const updateProp: any = await ProposalTableRow.findByIdAndUpdate({ _id: propID })
      .exec()
      .then(async (propFound) => {
        if (propFound) {
          let runCheck = [];
          let rowFinishes: any = propFound.finishes;
          for (let key in rowFinishes) {
            console.log("key in rowFinishes: ", key);
            runCheck.push(rowFinishes[key] == finishes[key]);
          }
          if (runCheck.some((item) => item == false)) {
            const subs = propFound.subTableRow;
            console.log("Subs triggered in update: ", subs);
            if (subs) {
              propFound.subTableRow = [String(proposal._id), ...subs];
            }
          }
          const newQuantity = propFound.lightQuantity + quantity;
          const newWattage = totalWatts * newQuantity;
          const newTotalLumens = totalLumens * newQuantity;
          const newRooms = propFound.rooms.map((room:any)=> room.name).indexOf(roomName) == -1 ?  [...propFound.rooms, {name: roomName, lightNumber: quantity}] : propFound.rooms;          
          const newRow = [...propFound.subTableRow, String(proposal._id)];
            propFound.lightQuantity = newQuantity;
            propFound.totalWatts = newWattage;
            propFound.totalLumens = newTotalLumens;
            propFound.rooms = newRooms;
            propFound.subTableRow = newRow;
          // }
          const done = await propFound.save();
          if (done) {
            console.log("DONE UPDATE~~~~~~~~~~~: ", {
              propFoundDone: done,
              newProposal: proposal,
            });
            return res.status(200).json({
              message: "Successful Update",
              done,
            });
          }
        }
      })
      .catch((error: any) => {
        console.log("ERROR on UPDATE prop: ", error);
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
          console.log("inRFP add ====: ", rfp);
          const newRow = [String(proposal._id), ...rfp.tableRow];
          rfp.tableRow = newRow;
          const done = await rfp.save();
          if (done) {
            console.log("DONE ADD ========= : ", {
              rfpFoundDone: done,
              newProposal: proposal,
            });
            return res.status(200).json({
              message: "Successful Add",
              done,
            });
          }
        }
      })
      .catch((error: any) => {
        console.log("ERROR on ADD rfp stuff: ", error);
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
        next();
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
};
