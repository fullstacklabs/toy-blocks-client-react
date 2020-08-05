import fetch from "cross-fetch";
import * as types from "../constants/actionTypes";

export const checkNodeStatusStart = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node,
  };
};

export const checkNodeStatusSuccess = (node, res) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    res,
  };
};

export const checkNodeStatusFailure = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node,
  };
};

export function checkNodeStatus(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeStatusStart(node));
      const res = await fetch(`${node.url}/api/v1/status`);

      if (res.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
      }

      const json = await res.json();

      dispatch(checkNodeStatusSuccess(node, json));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

export function checkNodeStatuses(list) {
  return (dispatch) => {
    list.forEach((node) => {
      dispatch(checkNodeStatus(node));
      dispatch(getNodeBlock(node));
    });
  };
}

export const getNodeBlockStart = (node) => {
  return {
    type: types.GET_NODE_BLOCK_START,
    node,
  };
};

export const getNodeBlockSuccess = (node, res) => {
  return {
    type: types.GET_NODE_BLOCK_SUCCESS,
    node,
    res,
  };
};

export const getNodeBlockFailure = (node) => {
  return {
    type: types.GET_NODE_BLOCK_FAILURE,
    node,
  };
};

export function getNodeBlock(node) {
  return (dispatch) => {
    try {
      dispatch(getNodeBlockStart(node));
      return fetch(`${node.url}/api/v1/blocks`)
        .then(async (res) => {
          if (res.status >= 400) {
            dispatch(getNodeBlockFailure(node));
          }
          const json = await res.json();
          return json;
        })
        .then((json) => dispatch(getNodeBlockSuccess(node, json)))
        .catch((error) => {
          throw Error(error.message);
        });
    } catch (err) {
      dispatch(getNodeBlockFailure(node));
    }
  };
}
