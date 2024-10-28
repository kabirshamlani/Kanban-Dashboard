// src/hooks/useFakeTicketTransition.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveTicket } from '../redux/ticketSlice';
import { transitions,states } from '../stateMachine';

const useFakeTicketTransition = (isLiveModeEnabled) => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickets);

  useEffect(() => {
    if (!isLiveModeEnabled) return;

    const intervalId = setInterval(() => {
      // Get random status with tickets available
      const statusesWithTickets = Object.keys(tickets).filter((status) => tickets[status].length > 0);
      if (statusesWithTickets.length === 0) return;

      const randomSourceStatus = statusesWithTickets[Math.floor(Math.random() * statusesWithTickets.length)];
      const sourceTickets = tickets[randomSourceStatus];
      
      // Select a random ticket from this status
      const randomTicket = sourceTickets[Math.floor(Math.random() * sourceTickets.length)];

      // Get allowed transitions from the current status
      const availableTransitions = transitions[randomTicket.status];
      if (!availableTransitions || availableTransitions.length === 0) return;

      // Choose a random destination status based on available transitions
    //   const randomDestStatus = availableTransitions[Math.floor(Math.random() * availableTransitions.length)];
      const randomDestDisplayStatus = availableTransitions[Math.floor(Math.random() * availableTransitions.length)];
      const randomDestStatus = Object.keys(states).find(key => states[key] === randomDestDisplayStatus);

      // Dispatch the moveTicket action to transition the ticket
      const sourceIndex = sourceTickets.findIndex(ticket => ticket.id === randomTicket.id);
      const destIndex = tickets[randomDestStatus]?.length || 0;

      dispatch(
        moveTicket({
          ticketId: randomTicket.id,
          sourceStatus: randomSourceStatus,
          destStatus: randomDestStatus,
          sourceIndex,
          destIndex,
        })
      );
    }, Math.floor(Math.random() * 1000) + 1000); // Random interval between 1s and 2s

    // Clean up interval on component unmount or when isLiveModeEnabled changes
    return () => clearInterval(intervalId);
  }, [isLiveModeEnabled, dispatch, tickets]);
};

export default useFakeTicketTransition;
