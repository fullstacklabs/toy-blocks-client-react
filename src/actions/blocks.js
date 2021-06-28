import fetch from "cross-fetch";
import * as types from "../constants/actionTypes";

const fetchBlocksStatusStart = (node) => {
  return {
    type: types.FETCH_BLOCK_STATUS_START,
    node,
  };
};

const fetchBlocksStatusSuccess = (node, data) => {
  return {
    type: types.FETCH_BLOCK_STATUS_SUCCESS,
    node,
    data,
  };
};

const fetchBlocksStatusFailure = (node) => {
  return {
    type: types.FETCH_BLOCK_STATUS_FAILURE,
    node,
    data: null
  };
};

export function fetchBlocksList(node) {
  return async (dispatch) => {
    try {
      dispatch(fetchBlocksStatusStart(node));
      const res = await fetch(`${node}/api/v1/blocks`);

      if (res.status >= 400) {
        dispatch(fetchBlocksStatusFailure(node));
        return;
      }

      const json = await res.json();

      dispatch(fetchBlocksStatusSuccess(node, json?.data));
    } catch (err) {
      dispatch(fetchBlocksStatusFailure(node));
    }
  };
}

export function fetchBlocksLists(node) {
  return (dispatch) => {
    dispatch(fetchBlocksList(node))
  }
}
