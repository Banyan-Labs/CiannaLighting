import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import multiUpload from "../middleware/fileUpload";
import verifyAuthorization from "../middleware/verifyAuthorization";
import catalogController from "../controller/catalogController";
import srController from "../controller/statusAndRegionController";
import ROLES_LIST from "../../config/rolesList";
const router = express.Router();

router.use(verifyJWT);
router.use(verifyAuthorization(ROLES_LIST.ADMIN, ROLES_LIST.EMPLOYEE));
router
  .get("/get-catalog", catalogController.getCatalogItems)
  .post("/create-light", multiUpload, catalogController.createCatalogItem)
  .post("/find-light", catalogController.getLight)
  .delete("/remove-light", catalogController.removeLight)
  .post("/new-sr", srController.addInfo)
  .delete("/delete-sr", srController.deleteData);

export = router;
