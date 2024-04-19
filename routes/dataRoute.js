import express from "express";
import {
  createData,
  deleteData,
  getAllData,
  loginUser,
  logoutUser,
  updateData,
} from "../controllers/dataController.js";

const router = express.Router();

router.post("/", createData);
router.get("/data", getAllData);
router.patch("/data/:id", updateData);
router.delete("/data/:id", deleteData);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
