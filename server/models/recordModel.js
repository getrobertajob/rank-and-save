// imports
import mongoose from 'mongoose';

// declare model
const RecordSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Author: { type: String, required: true },
  Votes: { type: Number, default: 0 },
});

// declare reference variable
const Record = mongoose.model('Record', RecordSchema);

export default Record;
