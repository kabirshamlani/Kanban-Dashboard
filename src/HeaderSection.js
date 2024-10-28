// src/HeaderSection.js
import React from 'react';
import './HeaderSection.css';

const HeaderSection = ({ ticketCounts, isLiveMode, onToggleLiveMode }) => {
  return (
    <div className="header-container">
      <h1 className="header-title">Kanban Dashboard</h1>
      <div className="header-controls">
        <div className="ticket-count-container">
          <span>To Do: {ticketCounts.TODO}</span>
          <span>In Progress: {ticketCounts.IN_PROGRESS}</span>
          <span>Blocked: {ticketCounts.BLOCKED}</span>
          <span>Done: {ticketCounts.DONE}</span>
        </div>
        <label className="toggle-label">
          Live Mode
          <input
            type="checkbox"
            checked={isLiveMode}
            onChange={(e) => onToggleLiveMode(e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

export default HeaderSection;
