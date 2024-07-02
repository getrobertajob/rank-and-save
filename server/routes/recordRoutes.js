import { Router } from "express";
import {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord
} from "../controllers/recordController.js";

const router = Router();

router.route('/records')
  .get(getAllRecords)
  .post(createRecord);

router.route('/records/:id')
  .get(getRecordById)
  .put(updateRecord)
  .delete(deleteRecord);

export default router;
