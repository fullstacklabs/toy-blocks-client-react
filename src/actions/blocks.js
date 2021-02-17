import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes';

export const retrieveBlocksStart = (node) => {
  return {
    type: types.RETRIEVE_BLOCKS_START,
    node
  };
};

export const retrieveBlocksSuccess = (node, blocks) => {
  return {
    type: types.RETRIEVE_BLOCKS_SUCCESS,
    node,
    blocks,
  };
};

export const retrieveBlocksFailure = node => {
  return {
    type: types.RETRIEVE_BLOCKS_FAILURE,
    node,
  };
};

export function retrieveBlocks(node) {
  return async (dispatch) => {
    try {
      dispatch(retrieveBlocksStart(node));
      const res = await fetch(`${node.url}/api/v1/blocks`);

      if (res.status >= 400) {
        dispatch(retrieveBlocksFailure(node));
      }

      const json = await res.json();

      dispatch(retrieveBlocksSuccess(node, json));
    } catch (err) {
      dispatch(retrieveBlocksFailure(node));
    }
  };
}
