// imports
import mongoose from "mongoose";

// declare model
const RecordSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: [true, "Title is required."],
    minlength: [1, "Title must be at least 1 character long"],
    maxlength: [40, "Title must be less than 40 characters long"],
  },
  Author: {
    type: String,
    required: [, "Author is required."],
    minlength: [1, "Author must be at least 1 character long"],
    maxlength: [40, "Author must be less than 40 characters long"],
  },
  Votes: {
    type: Number,
    default: 0,
  },
  Description: {
    type: String,
    required: [true, "A description is required"],
    minlength: [4, "Description must be at least 4 characters long"],
    max: [140, "Description can be no more than 140 characters long"],
  },
});

// declare reference variable
const Record = mongoose.model("Record", RecordSchema);

export default Record;
