const userStates = {
  inChatRoom: undefined,
};

const userReducer = (state = userStates, { type, payload }) => {
  switch (type) {
    case "JOIN_CHAT_ROOM": {
      return {
        ...state,
        inChatRoom: payload,
      };
    }
    case "LEAVE_CHAT_ROOM": {
      return {
        ...state,
        inChatRoom: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
