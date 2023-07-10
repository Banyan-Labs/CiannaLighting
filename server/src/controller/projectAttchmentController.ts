import { Request, Response } from "express";

import ProjectAttachments from "../model/ProjectAttachments";
import logging from "../../config/logging";
import { ActionType } from "../utils/constants";

const addAttachmentSection = async (req: Request, res: Response) => {
  const { projId, images, pdf } = req.body;
  
  await ProjectAttachments.findOne({ projectId: projId })
    .then(async (existing: any) => {
      if (existing) {
        if (images && images.length) {
          existing.images = [...images, ...existing.images];
        }

        if (pdf && pdf.length) {
          existing.pdf = [...new Set([...pdf, ...existing.pdf])];
        }

        await existing.save();

        return res.status(200).json({
          attachments: { ...existing._doc },
        });
      } else {
        const projectAttchments = new ProjectAttachments({
          projectId: projId,
          images: images ? images : [],
          pdf: pdf ? [...new Set([...pdf])] : [],
        });
        
        return await projectAttchments
          .save()
          .then((attachments) => {
            if (attachments) {
              return res.status(201).json({
                attachments,
              });
            }
          })
          .catch((error) => {
            logging.error(error.message, "addAttachmentSection");
            return res.status(500).json({
              message: error.message,
            });
          });
      }
    })
    .catch((error) => {
      logging.error(error.message, "addAttachmentSection");
      return res.status(500).json({
        message: error.message,
      });
    });
};

const getData = async (req: Request, res: Response) => {
  const { projId, images, pdf, edit } = req.body;

  await ProjectAttachments.findOne({ projectId: projId })
    .exec()
    .then(async (proj) => {
      logging.info(`Project found using ${projId}: ${JSON.stringify(proj)}`);
      if (proj) {
        if (edit) {
          if (edit === ActionType.ADD) {
            if (images && images.length) {
              proj.images = [...images, ...proj.images];
            }

            if (pdf && pdf.length) {
              const singleInstances = [...new Set(proj.pdf)];

              proj.pdf = [...new Set([...pdf, ...singleInstances])];
            }
          } else if (edit === ActionType.REPLACE) {
            if (images) {
              proj.images = [...images];
            }
            if (pdf) {
              proj.pdf = [...pdf];
            }
          }

          await proj.save();
        }

        return res.status(200).json({
          proj,
        });
      } else {
        return res.status(204).json( { message: `No project attachments found using projectID of #${projId}.` } );;
      }
    })
    .catch((error) => {
      logging.error(error.message, "getData");
      return res.status(500).json({
        message: error.message,
      });
    });
};

const deleteData = async (req: Request, res: Response) => {
  const { projId, item, images } = req.body;

  if ((item && item.length) || (images && images.length)) {
    await ProjectAttachments.findOne({ projectId: projId }).then(
      async (projectAttach) => {
        if (projectAttach) {
          if (images && images.length) {
            let copyOfImages = projectAttach.images.slice();

            await images.map((containerId: any) => {
              const indexCheck = copyOfImages
                .map((v) => v.lightId)
                .indexOf(containerId);

              if (indexCheck > -1) {
                copyOfImages = copyOfImages.filter(
                  (_, index) => index != indexCheck
                );
              }
            });
            projectAttach.images = copyOfImages;
            //attachments is array
            const imageVSpdf = copyOfImages
              .map((img) => img.attachments)
              .flat();
            const pdfVSimg = projectAttach.pdf.filter(
              (pdf) => imageVSpdf.indexOf(pdf) > -1
            );

            if (pdfVSimg.length !== projectAttach.pdf.length) {
              projectAttach.pdf = pdfVSimg;
            }
          }
          if (item && item.length) {
            const filteredPDF = projectAttach.pdf.filter(
              (internal: string) => internal !== item
            );
            const filteredImages = projectAttach.images
              .map((internal) =>
                Object({
                  lightId: internal.lightId,
                  attachments: internal.attachments.filter(
                    (attachment) => attachment !== item
                  ),
                })
              ).filter((item) => item.attachments.length);

            projectAttach.pdf = filteredPDF;
            projectAttach.images = filteredImages;
          }

          await projectAttach.save();

          return res.json({
            message: `Deleted ${item ? item : "item"
              } from attachments with projectId of ${projId}.`,
            projectAttach,
          });
        }
      }
    );
  } else {
    await ProjectAttachments.findOneAndDelete({ projId })
      .then((data) => {
        return res.status(200).json({
          message: `Successfully deleted ${data?.projectId}`,
        });
      })
      .catch((error) => {
        logging.error(error.message, "deleteData");
        return res.status(500).json({
          message: error.message,
          error,
        });
      });
  }
};

export default { addAttachmentSection, getData, deleteData };
