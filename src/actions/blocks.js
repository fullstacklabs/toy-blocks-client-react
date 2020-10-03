import * as types from '../constants/actionTypes';

const getBlockFaiure = node => {
  return {
    type: types.GET_BLOCK_NODE_STATUS_FAILURE,
    nodeUrl: node.url,
  };
};

const getBlockSuccess = (node, res) => {
  return {
    type: types.GET_BLOCK_NODE_STATUS_SUCCESS,
    nodeUrl: node.url,
    res
  };
};

const checkNodeBlockStatusStart = (node) => {
  return {
    type: types.GET_BLOCK_NODE_STATUS_START,
    nodeUrl: node.url
  };
};

export function getNodeBlocks(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeBlockStatusStart(node));
      const res = await fetch(`${node.url}/api/v1/blocks`);

      if (res.status >= 400) {
        dispatch(getBlockFaiure(node));
      }

      const json = await res.json();
      dispatch(getBlockSuccess(node, json));
    } catch (err) {
      dispatch(getBlockFaiure(node));
    }
  };
}