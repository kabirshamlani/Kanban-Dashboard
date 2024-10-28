// src/KanbanColumn.js
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TicketCard from './TicketCard';
import './KanbanColumn.css';

const KanbanColumn = ({ status, tickets = [] }) => {
  return (
    <div style={styles.column}>
      <h2 style={styles.header}>
        {status} ({tickets.length})
      </h2>
      <div style={styles.ticketList}>
        {tickets.map((ticket, index) => (
          <Draggable key={String(ticket.id)} draggableId={String(ticket.id)} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style, // Apply draggable styles
                  ...styles.draggableItem,
                  ...(snapshot.isDragging && styles.draggingItem), // Add style during drag
                }}
              >
                <TicketCard ticket={ticket} />
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
};

const styles = {
  column: {
    flex: '1 1 300px',
    maxWidth: '100%',
    // border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    height: 'auto',
    margin: '10px',
    backgroundColor: '#ffffff',
    // boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#333',
    position: 'sticky',
    top: 0,
    backgroundColor: '#ffffff',
    padding: '10px 0',
    width: '100%',
    zIndex: 1,
    // overflowY: 'scroll',
  },
  ticketList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  draggableItem: {
    marginBottom: '10px',
  },
};

export default KanbanColumn;
