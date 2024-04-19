import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dataRoute from "./routes/dataRoute.js";

const app = express();
mongoose.connect("mongodb://localhost:27017/test_lnk");
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("database connected"));

app.use(cors());
app.use(express.json());
app.use(dataRoute);

app.listen(5000, () => console.log("server running on "));
