// src/redux/ticketSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ticketData } from '../generateTickets';
import { states } from '../stateMachine';

export const loadMoreTickets = createAsyncThunk(
  'tickets/loadMoreTickets',
  async ({ status, count }, { getState }) => {
    const state = getState();
    const existingTickets = state.tickets.tickets[status] || [];
    const startIndex = existingTickets.length;
    const newTickets = ticketData
      .filter((ticket) => ticket.status === states[status])
      .slice(startIndex, startIndex + count);

    return { status, newTickets };
  }
);

const initialState = {
  tickets: {
    TODO: ticketData.filter((t) => t.status === 'To Do').slice(0, 20),
    IN_PROGRESS: ticketData.filter((t) => t.status === 'In Progress').slice(0, 20),
    BLOCKED: ticketData.filter((t) => t.status === 'Blocked').slice(0, 20),
    DONE: ticketData.filter((t) => t.status === 'Done').slice(0, 20),
  },
  ticketCounts: {
    TODO: ticketData.filter((t) => t.status === 'To Do').length,
    IN_PROGRESS: ticketData.filter((t) => t.status === 'In Progress').length,
    BLOCKED: ticketData.filter((t) => t.status === 'Blocked').length,
    DONE: ticketData.filter((t) => t.status === 'Done').length,
  },
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    loadTickets: (state) => {
      state.tickets = { ...initialState.tickets };
      state.ticketCounts = { ...initialState.ticketCounts };
    },
    moveTicket: (state, action) => {
      console.log(action.payload);
      const { sourceStatus, destStatus, sourceIndex, destIndex } = action.payload;
      if (!state.tickets[sourceStatus]) return;
      if (!state.tickets[destStatus]) {
        state.tickets[destStatus] = []; 
      }
    
      // If moving within the same column, reorder the items
      if (sourceStatus === destStatus) {
        const tickets = [...state.tickets[sourceStatus]];
        const [movedTicket] = tickets.splice(sourceIndex, 1); // Remove the dragged item
        tickets.splice(destIndex, 0, movedTicket); // Insert it at the new position
    
        // Update the state immutably
        state.tickets[sourceStatus] = tickets;
      } else {
        // Moving to a different column
        const sourceTickets = [...state.tickets[sourceStatus]];
        const destTickets = [...state.tickets[destStatus]];
    
        // Remove ticket from source and add to destination
        const [movedTicket] = sourceTickets.splice(sourceIndex, 1);
        movedTicket.status = destStatus; // Update the ticket's status
    
        destTickets.splice(destIndex, 0, movedTicket);
    
        // Update the Redux state immutably
        state.tickets[sourceStatus] = sourceTickets;
        state.tickets[destStatus] = destTickets;
    
        // Update the total count
        state.ticketCounts[sourceStatus] -= 1;
        state.ticketCounts[destStatus] += 1;
      }
    }

  },
  extraReducers: (builder) => {
    builder.addCase(loadMoreTickets.fulfilled, (state, action) => {
      const { status, newTickets } = action.payload;
      if (newTickets.length > 0) {
        state.tickets[status] = [...(state.tickets[status] || []), ...newTickets];
        // state.ticketCounts[status] += newTickets.length;
      }
    });
  },
});

export const { loadTickets, moveTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
