export const toggle = toast => {
  return {
    type: "TOGGLE",
    payload: toast,
  };
};

export const clear = () => {
  return {
    type: "CLEAR",
  };
};

export const setLoading = loading => {
  return {
    type: "LOADING",
    payload: loading,
  };
};
