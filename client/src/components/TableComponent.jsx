import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Table({ onSelectRecord }) {
  const [records, setRecords] = useState([]);
  const [userVotes, setUserVotes] = useState(() => {
    // Load initial votes from local storage
    const savedVotes = localStorage.getItem('userVotes');
    return savedVotes ? JSON.parse(savedVotes) : {};
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    // Save votes to local storage whenever they change
    localStorage.setItem('userVotes', JSON.stringify(userVotes));
  }, [userVotes]);

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
      const currentVote = userVotes[id] || 0;

      // Calculate the change in vote based on the current vote
      let voteChange = change;
      if (currentVote === change) {
        voteChange = -change;
      } else if (currentVote !== 0) {
        voteChange = change * 2;
      }

      const updatedVotes = record.Votes + voteChange;

      await axios.put(`${process.env.REACT_APP_API_URL}/records/${id}`, { Votes: updatedVotes });

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

export default Table;
