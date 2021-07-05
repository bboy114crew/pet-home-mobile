import { put, all, takeLatest } from "redux-saga/effects";
import PostServices from "../../services/PostServices";
import PostActionTypes from "../types/PostActionTypes";
import { getSuccess, getFailed } from "../actions/PostActions";

const getPost = function*({ type, payload }) {
  try {
    const postType = payload;
    let postData = [];
    if (postType === "all") {
      postData = yield PostServices.getAll();
    } else {
      postData = yield PostServices.getPostByType(postType);
    }
    yield put(getSuccess(postData));
  } catch (error) {
    yield put(getFailed());
  }
};

const postWatcher = function*() {
  yield all([takeLatest(PostActionTypes.GET_POST, getPost)]);
};

export default [postWatcher];
