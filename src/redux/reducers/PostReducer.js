import PostActionTypes from "../types/PostActionTypes";

const initialState = {
  postData: [],
  postType: "all",
  loading: false,
  error: false,
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PostActionTypes.ADD_POST: {
      let tmp = [payload];
      tmp = tmp.concat(state.postData);
      return {
        ...state,
        postData: tmp,
      };
    }
    case PostActionTypes.EDIT_POST: {
      let tmp = [...state.postData];
      let index = tmp.findIndex(item => item._id === payload._id);
      if (index > -1) {
        tmp[index] = payload;
      }
      return {
        ...state,
        postData: tmp,
      };
    }
    case PostActionTypes.GET_POST: {
      return {
        ...state,
        postType: payload,
        loading: true,
      };
    }
    case PostActionTypes.GET_SUCCESS: {
      return {
        ...state,
        postData: payload,
        loading: false,
      };
    }
    case PostActionTypes.GET_FAILED: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }
    case PostActionTypes.DELETE_POST: {
      const tmp = state.postData.filter(post => post !== payload);
      return {
        ...state,
        postData: tmp,
      };
    }
    default: {
      return state;
    }
  }
};

export default postReducer;
