import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/configMongooseDB.js";
import recordRoutes from "./routes/recordRoutes.js";
import cors from "cors"; // Import cors
// testing git again
dotenv.config();

const app = express();
connectDB();

app.use(cors()); // Use cors middleware
app.use(express.json());

app.use("/api", recordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
