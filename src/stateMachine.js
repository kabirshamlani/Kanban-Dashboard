// src/stateMachine.js

export const states = {
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    BLOCKED: 'Blocked',
    DONE: 'Done',
  };
  
  // Allowed transitions in the FSA
  export const transitions = {
    [states.TODO]: [states.IN_PROGRESS],
    [states.IN_PROGRESS]: [states.BLOCKED, states.DONE],
    [states.BLOCKED]: [states.IN_PROGRESS],
    
  };
  
  // Function to check if a transition is allowed
  export const canTransition = (currentState, newState) => {
    return transitions[currentState]?.includes(newState);
  };
  