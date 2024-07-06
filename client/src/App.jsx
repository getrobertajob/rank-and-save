import React, { useState } from 'react';
import Banner from './components/Banner';
import Table from './components/Table';
import Form from './components/Form';

function App() {
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleSelectRecord = (record) => {
    setSelectedRecord(record);
  };
// test
  return (
    <div className="App">
      <Banner />
      <div className="main">
        <Table onSelectRecord={handleSelectRecord} />
        <Form selectedRecord={selectedRecord} />
      </div>
    </div>
  );
}

export default App;
