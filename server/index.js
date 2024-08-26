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

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Add a route to display "server is running"
app.get('/', (req, res) => {
    res.send("server is running.");
});

app.listen(process.env.PORT, () => {
    console.log("Listening on port: " + process.env.PORT);
});