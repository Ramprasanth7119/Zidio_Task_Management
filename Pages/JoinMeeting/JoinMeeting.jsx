import React from 'react';
import { useNavigate } from 'react-router-dom';

const JoinMeeting = () => {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate('/join-meeting');  
  };

  return (
    <div className="container mt-5">
      <h2>Join an Open Meeting</h2>
      <button className="btn btn-primary" onClick={handleJoin}>
        Join Meeting
      </button>
    </div>
  );
};

export default JoinMeeting;
