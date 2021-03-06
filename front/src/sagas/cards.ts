import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../actions";
import {
  checkCard,
  deleteCard,
  fetchCard,
  patchCard,
  postCard,
} from "../axios/cards";
import { errorToast, successToast } from "../utils";

function* fetch(action: any) {
  try {
    const { cards } = yield call(fetchCard);
    yield put({ type: actions.FETCH_CARDS_SUCCEEDED, payload: cards });
  } catch (e) {
    yield put({ type: actions.FETCH_CARDS_FAILED, messagae: e.message });
  }
}

function* post(action: any) {
  try {
    yield call(postCard, { data: action.payload });
    yield put({ type: actions.POST_CARD_SUCCEEDED });
    yield put({ type: actions.FETCH_CARDS_REQUESTED });
    successToast("新しいカードを作成しました");
  } catch (e) {
    errorToast("カードの作成に失敗しました");
    yield put({ type: actions.POST_CARD_FAILED, messagae: e.message });
  }
}

function* patch(action: any) {
  try {
    yield call(patchCard, { data: action.payload }, action.id);
    yield put({ type: actions.PATCH_CARD_SUCCEEDED });
    yield put({ type: actions.FETCH_CARDS_REQUESTED });
    successToast("変更を保存しました");
  } catch (e) {
    errorToast("変更できませんでした");
    yield put({ type: actions.POST_CARD_FAILED, messagae: e.message });
  }
}

function* check(action: any) {
  try {
    yield call(checkCard, action.payload);
    yield put({ type: actions.CHECK_CARD_SUCCEEDED });
    yield put({ type: actions.FETCH_CARDS_REQUESTED });
    successToast("学習を完了しました");
  } catch (e) {
    yield put({ type: actions.CHECK_CARD_FAILED, messagae: e.message });
    errorToast("エラーが発生しました");
  }
}
function* deleteCards(action: any) {
  try {
    yield call(deleteCard, action.id);
    yield put({ type: actions.DELETE_CARD_SUCCEEDED });
    yield put({ type: actions.FETCH_CARDS_REQUESTED });
    errorToast("カードを削除しました");
  } catch (e) {
    yield put({ type: actions.DELETE_CARD_FAILED, messagae: e.message });
  }
}

function* cards() {
  yield takeLatest(actions.FETCH_CARDS_REQUESTED, fetch);
  yield takeLatest(actions.POST_CARD_REQUESTED, post);
  yield takeLatest(actions.CHECK_CARD_REQUESTED, check);
  yield takeLatest(actions.PATCH_CARD_REQUESTED, patch);
  yield takeLatest(actions.DELETE_CARD_REQUESTED, deleteCards);
}

export default cards;
