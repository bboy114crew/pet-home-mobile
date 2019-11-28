export const toast = (state = null, { type, payload }) => {
  switch (type) {
    case "TOGGLE": {
      return payload;
    }
    case "CLEAR": {
      return null;
    }
    default: {
      return state;
    }
  }
};

export const appLoading = (state = false, { type, payload }) => {
  if (type === "LOADING") {
    return payload;
  }
  return state;
};
