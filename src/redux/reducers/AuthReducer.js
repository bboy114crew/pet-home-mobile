const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        userData: action.payload,
      };
    }
    case "LOGOUT": {
      return {};
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
