import * as actionTypes from '../constants/actionTypes';

const getBlocksStart = (node) => {
  return {
    type: actionTypes.GET_BLOCKS_START,
    node
  }
}

const getBlocksSuccess = (node, data) => {
  return {
    type: actionTypes.GET_BLOCKS_SUCCESS,
    node,
    data
  }
}

const getBlocksFailure = (node, error) => {
  return {
    type: actionTypes.GET_BLOCKS_FAILURE,
    node,
    error
  }
}

export function getBlocks(node) {
  return async dispatch => {
    try {
      dispatch(getBlocksStart(node.url));
      const req = await fetch(`${node.url}/api/v1/blocks`);
      if (req.status >= 400) {
        dispatch(getBlocksFailure(node.url, 'Error fetching blocks!'));
      }
      const json = await req.json();
      dispatch(getBlocksSuccess(node.url, json.data));
    } catch (error) {
      dispatch(getBlocksFailure(node.url, 'Error fetching blocks!'));
    }
  }
}

export function getBlocksLists(list) {
  return (dispatch) => {
    list.forEach(node => {
      dispatch(getBlocks(node));
    });
  };
}
