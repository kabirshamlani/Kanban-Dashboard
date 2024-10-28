// src/App.js
import React, { useEffect, useState } from 'react';
import HeaderSection from './HeaderSection';
import KanbanColumn from './KanbanColumn';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { loadTickets, moveTicket, loadMoreTickets } from './redux/ticketSlice';
import { canTransition, states } from './stateMachine';
import useFakeTicketTransition from './hooks/useFakeTicketTransition';
import './App.css';

const statuses = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  BLOCKED: "BLOCKED",
  DONE: "DONE"
};

const statusKeys = Object.keys(statuses);

function App() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickets || {});
  const ticketCounts = useSelector((state) => state.tickets.ticketCounts || {});
  const [loadingStatus, setLoadingStatus] = useState({});
  const [isLiveMode, setIsLiveMode] = useState(false);

  useFakeTicketTransition(isLiveMode);

  useEffect(() => {
    dispatch(loadTickets());
  }, [dispatch]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceStatusDisplay = states[source.droppableId];
    const destStatusDisplay = states[destination.droppableId];
    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    if (!canTransition(sourceStatusDisplay, destStatusDisplay)) {
      if (sourceStatus !== destStatus) {
        alert(`Transition from ${sourceStatusDisplay} to ${destStatusDisplay} is not allowed.`);
        return;
      }
    }

    dispatch(
      moveTicket({
        ticketId: parseInt(result.draggableId, 10),
        sourceStatus,
        destStatus,
        sourceIndex: source.index,
        destIndex: destination.index,
      })
    );
  };

  const handleScroll = (status) => (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (isAtBottom && !loadingStatus[status]) {
      setLoadingStatus((prev) => ({ ...prev, [status]: true }));
      dispatch(loadMoreTickets({ status, count: 20 })).then(() => {
        setLoadingStatus((prev) => ({ ...prev, [status]: false }));
      });
    }
  };

  return (
    <div className="app">
      <HeaderSection
        ticketCounts={ticketCounts}
        isLiveMode={isLiveMode}
        onToggleLiveMode={setIsLiveMode}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
          {statusKeys.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="column-container"
                  onScroll={handleScroll(status)}
                >
                  <KanbanColumn
                    status={status}
                    tickets={tickets[status] || []}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
