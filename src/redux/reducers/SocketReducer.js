import SocketClient from "socket.io-client";
import { SERVER_INFO } from "../../constants/config";
const socketIP = SERVER_INFO.PUBLIC_ADDRESS;

const socketReducer = (state = null, { type, payload }) => {
  switch (type) {
    case "INIT": {
      const socket = SocketClient(`http://${socketIP}:5000`);
      return socket;
    }
    default: {
      return state;
    }
  }
};

export default socketReducer;
