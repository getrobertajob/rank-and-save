import React, { useState } from "react";
import Banner from "./components/Banner";
import TableComponent from "./components/TableComponent";
import Form from "./components/Form";

function App() {
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleSelectRecord = (record) => {
    setSelectedRecord(record);
  };
  // test
  // test
  // test - robert
  return (
    <div className="App">
      <Banner />
      <div className="main">
        <TableComponent onSelectRecord={handleSelectRecord} />
        <Form selectedRecord={selectedRecord} />
      </div>
    </div>
  );
}

export default App;
