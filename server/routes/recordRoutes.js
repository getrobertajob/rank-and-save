// imports
import { Router } from "express";
import {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord
} from "../controllers/recordController.js";


const router = Router();

// routes for base url
router.route('/records')
  .get(getAllRecords)
  .post(createRecord);

// routes with id parameter
router.route('/records/:id')
  .get(getRecordById)
  .put(updateRecord)
  .delete(deleteRecord);

export default router;
