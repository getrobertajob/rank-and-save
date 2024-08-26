// imports
import { connect } from "mongoose";
import dotenv from "dotenv";

// declare config for DB
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

// function to connect to DB
export const connectDB = async () => {
  try {
    await connect(MONGODB_URI, {
      dbName: "MST",
    });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.log("DB Connection Failed: Error ----> " + error);
  }
}; 












// // imports
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// // function to connect to databas
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

// export default connectDB;
