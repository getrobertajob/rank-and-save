import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Form({ selectedRecord }) {
  const [formData, setFormData] = useState({ Title: '', Author: '', Description: '' });
  const [editMode, setEditMode] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (selectedRecord) {
      setFormData(selectedRecord);
      setEditMode(false);
      setIsNew(false);
    }
  }, [selectedRecord]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNew = () => {
    setFormData({ Title: '', Author: '', Description: '' });
    setEditMode(true);
    setIsNew(true);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/records/${formData._id}`);
      setFormData({ Title: '', Author: '', Description: '' });
      setEditMode(false);
      setIsNew(false);
    } catch (err) {
      console.error(err);
    }
  };

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

export default Form;
