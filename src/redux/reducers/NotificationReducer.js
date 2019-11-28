const notificationReducer = (state = [], { type, payload }) => {
  switch (type) {
    case "PUSH": {
      return [...state, payload]
    }
    case "CLEAR": {
      return [];
    }
    default: {
      return state;
    }
  }
};

export default notificationReducer;
