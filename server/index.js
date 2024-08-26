import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
// import connectDB from "./config/configMongooseDB.js";
import { connectDB } from "./config/configMongooseDB.js";
import recordRoutes from "./routes/recordRoutes.js";
connectDB();

const app = express();

app.use(cors()); // Use cors middleware
app.use(express.json());
dotenv.config();

app.use("/api", recordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
