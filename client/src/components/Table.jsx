import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Table({ onSelectRecord }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/records`);
      setRecords(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTitleClick = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/records/${id}`);
      onSelectRecord(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVote = async (id, change) => {
    try {
      const record = records.find((record) => record._id === id);
      await axios.put(`${process.env.REACT_APP_API_URL}/records/${id}`, { Votes: record.Votes + change });
      fetchRecords();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <table className="Table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Title</th>
          <th>Author</th>
          <th>Votes</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, index) => (
          <tr key={record._id}>
            <td>{index + 1}</td>
            <td onClick={() => handleTitleClick(record._id)}>{record.Title}</td>
            <td>{record.Author}</td>
            <td>
              <span className="upvote" onClick={() => handleVote(record._id, 1)}>▲</span>
              <span className="downvote" onClick={() => handleVote(record._id, -1)}>▼</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
