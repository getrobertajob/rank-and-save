// imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormComponent({ selectedRecord, onFormSubmit }) {
  // declare use state
  const [formData, setFormData] = useState({ Title: '', Author: '', Description: '' });
  const [editMode, setEditMode] = useState(false);
  const [isNew, setIsNew] = useState(false);

  // to check if user has clicked on a record in html table yet
  // and if so then populates form with data and sets use state
  useEffect(() => {
    if (selectedRecord) {
      setFormData(selectedRecord);
      setEditMode(false);
      setIsNew(false);
    }
  }, [selectedRecord]);

  // function to handle updating form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // function to handle if user clicks on new button
  // includes clearing form data
  const handleNew = () => {
    setFormData({ Title: '', Author: '', Description: '' });
    setEditMode(true);
    setIsNew(true);
  };

  // function to handle if user clicks on the edit button
  // includes changing form inputs to editable
  const handleEdit = () => {
    setEditMode(true);
  };

  // function to handle if user clicks on the delete button
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/records/${formData._id}`);
      setFormData({ Title: '', Author: '', Description: '' });
      setEditMode(false);
      setIsNew(false);
      onFormSubmit();
    } catch (err) {
      console.error(err);
    }
  };

  // function to handle if user clicks on the save button
  // includes popup to confirm save was sucessful
  const handleSave = async () => {
    try {
      if (isNew) {
        await axios.post(`${process.env.REACT_APP_API_URL}/records`, formData);
      } else {
        await axios.put(`${process.env.REACT_APP_API_URL}/records/${formData._id}`, formData);
      }
      setEditMode(false);
      setIsNew(false);
      alert('Save was successful');
      onFormSubmit();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Form">
      <div className="form-buttons">
        <button onClick={handleNew}>New</button>
        <button onClick={handleEdit} disabled={!formData._id}>Edit</button>
        <button onClick={handleDelete} disabled={!formData._id}>Delete</button>
        <button onClick={handleSave} disabled={!editMode}>Save</button>
      </div>
      <div className="form-fields">
        <label>
          Title:
          <input type="text" name="Title" value={formData.Title} onChange={handleChange} disabled={!editMode} />
        </label>
        <label>
          Author:
          <input type="text" name="Author" value={formData.Author} onChange={handleChange} disabled={!editMode} />
        </label>
        <label>
          Description:
          <textarea name="Description" value={formData.Description} onChange={handleChange} disabled={!editMode}></textarea>
        </label>
      </div>
    </div>
  );
}

export default FormComponent;
