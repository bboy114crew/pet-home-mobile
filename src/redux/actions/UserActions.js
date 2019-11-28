export const joinChatRoom = roomId => {
  return {
    type: "JOIN_CHAT_ROOM",
    payload: roomId,
  };
};

export const leaveChatRoom = () => {
  return {
    type: "LEAVE_CHAT_ROOM",
  };
};
