import React, { useState } from "react";
import Banner from "./components/Banner.jsx";
import TableComponent from "./components/TableComponent.jsx";
import FormComponent from "./components/FormComponent.jsx";

function App() {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [refreshTable, setRefreshTable] = useState(false);

  const handleSelectRecord = (record) => {
    setSelectedRecord(record);
  };

  const handleFormSubmit = () => {
    setRefreshTable(!refreshTable);
  };

  return (
    <div className="App">
      <Banner />
      <div className="main">
        <TableComponent
          onSelectRecord={handleSelectRecord}
          refreshTable={refreshTable}
        />
        <FormComponent
          selectedRecord={selectedRecord}
          onFormSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
}

export default App;
