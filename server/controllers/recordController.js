// imports
import Record from "../models/recordModel.js";

// function to create new record
export const createRecord = async (req, res) => {
  try {
    const newRecord = new Record(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// function to get all records order by vote column as ascending
export const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find().sort({ Votes: -1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// function to get one record by ID
export const getRecordById = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// function to update one record by ID
export const updateRecord = async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// function to delete one record by ID
export const deleteRecord = async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
