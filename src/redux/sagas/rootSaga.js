import { all, fork } from "redux-saga/effects";
import PostSagas from "./PostSagas";

export default function* rootSaga() {
  yield all([
    ...PostSagas.map(watcher => {
      return fork(watcher);
    }),
  ]);
}
