import PostActionTypes from "../types/PostActionTypes";

export const getPost = type => {
  return {
    type: PostActionTypes.GET_POST,
    payload: type,
  };
};

export const getSuccess = postData => {
  return {
    type: PostActionTypes.GET_SUCCESS,
    payload: postData,
  };
};

export const getFailed = () => {
  return {
    type: PostActionTypes.GET_FAILED,
  };
};

export const deletePost = post => {
  return {
    type: PostActionTypes.DELETE_POST,
    payload: post,
  };
};

export const addPost = post => {
  return {
    type: PostActionTypes.ADD_POST,
    payload: post,
  };
};

export const editPost = post => {
  return {
    type: PostActionTypes.EDIT_POST,
    payload: post,
  };
};
