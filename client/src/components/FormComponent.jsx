// imports
import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function FormComponent({ selectedRecord, onFormSubmit }) {
  // declare use state
  const [formData, setFormData] = useState({
    Title: "",
    Author: "",
    Description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState({});
  const [color, changeColor] = useState("white");
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
    setFormData({ Title: "", Author: "", Description: "" });
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
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/records/${formData._id}`
      );
      setFormData({ Title: "", Author: "", Description: "" });
      setEditMode(false);
      setIsNew(false);
      onFormSubmit();
    } catch (error) {
      setError(error.response.data.errors);
    }
  };

  // function to handle if user clicks on the save button
  // includes popup to confirm save was sucessful
  const handleSave = async () => {
    try {
      if (isNew) {
        await axios.post(`${process.env.REACT_APP_API_URL}/records`, formData);
      } else {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/records/${formData._id}`,
          formData
        );
      }
      setEditMode(false);
      setIsNew(false);
      alert("Save was successful");
      onFormSubmit();
    } catch (error) {
      setError(error.response.data.errors);
    }
  };

  return (
    <div className="Form">
      <div className="form-buttons">
        <Button
          variant="primary"
          onClick={() => {
            handleNew();
            changeColor("rgba(255, 255, 255, 0.822)");
          }}
        >
          New
        </Button>
        <Button
          variant="info"
          onClick={() => {
            changeColor("  rgb(146, 218, 241)");
            handleEdit();
          }}
          disabled={!formData._id}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleDelete(changeColor("red"));
          }}
          disabled={!formData._id}
        >
          Delete
        </Button>
        <Button
          variant="success"
          size="lg"
          onClick={() => {
            handleSave(changeColor("rgba(255, 255, 255, 0.822)"));
          }}
          disabled={!editMode}
        >
          Save
        </Button>
      </div>
      <div className="form-fields">
        <label>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">Title:</InputGroup.Text>
            <Form.Control
              style={{ backgroundColor: `${color}` }}
              type="text"
              aria-label="Title"
              aria-describedby="inputGroup-sizing-sm"
              value={formData.Title}
              onChange={handleChange}
              disabled={!editMode}
            />
          </InputGroup>
          <p>{error.Title?.message}</p>
        </label>
        <label>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">Author:</InputGroup.Text>
            <Form.Control
              style={{ backgroundColor: `${color}` }}
              aria-label="Author"
              aria-describedby="inputGroup-sizing-sm"
              value={formData.Author}
              onChange={handleChange}
              disabled={!editMode}
            />
          </InputGroup>
          <p>{error.Author?.message}</p>
        </label>
        <label>
          <InputGroup>
            <InputGroup.Text>Description:</InputGroup.Text>
            <Form.Control
              style={{ backgroundColor: `${color}` }}
              as="textarea"
              aria-label="Description"
              value={formData.Description}
              onChange={handleChange}
              disabled={!editMode}
            />
          </InputGroup>
          <p>{error.Description?.message}</p>
        </label>
      </div>
    </div>
  );
}

export default FormComponent;
