// imports
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TableComponent({ onSelectRecord, refreshTable }) {
  // declare use state
  const [records, setRecords] = useState([]);
  const [userVotes, setUserVotes] = useState(() => {
    // declare variable to store the votes from user state to make data persistant
    // loads initial votes from local storage on page load
    const savedVotes = localStorage.getItem('userVotes');
    return savedVotes ? JSON.parse(savedVotes) : {};
  });

  // to populate html table on page load
  useEffect(() => {
    fetchRecords();
  }, [refreshTable]);

  // to save votes to local storage when votes change
  useEffect(() => {
    localStorage.setItem('userVotes', JSON.stringify(userVotes));
  }, [userVotes]);

  // function to query database for all records for html table
  const fetchRecords = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/records`);
      setRecords(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // function to handle when user clicks on title of record in html table
  const handleTitleClick = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/records/${id}`);
      onSelectRecord(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // function to handle when user clicks on up or down vote buttons
  const handleVote = async (id, change) => {
    try {
      const record = records.find((record) => record._id === id);
      const currentVote = userVotes[id] || 0;

      // to calculate the change in vote based on the current vote
      // includes if user previously voted so it goes from +1 to -2 or -1 to +2
      let voteChange = change;
      if (currentVote === change) {
        voteChange = -change;
      } else if (currentVote !== 0) {
        voteChange = change * 2;
      }

      const updatedVotes = record.Votes + voteChange;

      await axios.put(`${process.env.REACT_APP_API_URL}/records/${id}`, { Votes: updatedVotes });

      // to update the votes stored in user state
      setUserVotes((prevVotes) => ({
        ...prevVotes,
        [id]: currentVote === change ? 0 : change,
      }));

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
          <tr
            key={record._id}
            className={
              userVotes[record._id] === 1
                ? 'upvoted'
                : userVotes[record._id] === -1
                  ? 'downvoted'
                  : ''
            }
          >
            <td>{index + 1}</td>
            <td onClick={() => handleTitleClick(record._id)}>{record.Title}</td>
            <td>{record.Author}</td>
            <td>
              <button
                className={`upvote ${userVotes[record._id] === 1 ? 'voted' : ''}`}
                onClick={() => handleVote(record._id, 1)}
                disabled={userVotes[record._id] === 1}
              >
                ▲
              </button>
              <button
                className={`downvote ${userVotes[record._id] === -1 ? 'voted' : ''}`}
                onClick={() => handleVote(record._id, -1)}
                disabled={userVotes[record._id] === -1}
              >
                ▼
              </button>
              {record.Votes}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableComponent;
