import React, { useState } from "react";
import Banner from "./components/Banner.jsx";
import TableComponent from "./components/TableComponent.jsx";
import FormComponent from "./components/FormComponent.jsx";

function App() {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [refreshTable, setRefreshTable] = useState(false);
  const [error, setError] = useState({});

  const handleSelectRecord = (record) => {
    setSelectedRecord(record);
    setError({}); // Clear errors when selecting a new record
  };

  const handleFormSubmit = () => {
    setRefreshTable(!refreshTable);
  };

  const clearErrors = () => {
    setError({});
  };

  return (
    <div className="App">
      <Banner />
      <div className="main">
        <TableComponent 
          onSelectRecord={handleSelectRecord} 
          refreshTable={refreshTable} 
          clearErrors={clearErrors} // Pass the clearErrors function
        />
        <FormComponent 
          selectedRecord={selectedRecord} 
          onFormSubmit={handleFormSubmit} 
          error={error}
          setError={setError} // Pass the setError function
        />
      </div>
    </div>
  );
}

export default App;
