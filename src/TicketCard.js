// src/TicketCard.js
import React from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket }) => {
  const normalizedStatus = ticket.status.toLowerCase().replace(/ /g, "-");

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h3 className="ticket-title">{ticket.title}</h3>
        <span className="ticket-id">ID: {ticket.id}</span>
      </div>
      <p className="ticket-description">{ticket.description}</p>
      <div className="ticket-status-section">
        <label htmlFor="statusSelect" className="status-label">
          Status:
        </label>
        <span className={`status-badge status-${normalizedStatus}`}>
          {ticket.status}
        
        </span>
      </div>
    </div>
  );
};

export default TicketCard;
