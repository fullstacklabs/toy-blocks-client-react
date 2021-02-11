import fetch from 'cross-fetch'
import * as types from '../constants/actionTypes'

const fetchBlocksStart = (node) => {
  return {
    type: types.FETCH_BLOCKS_START,
    node
  }
}

const fetchBlocksSuccess = (node, res) => {
  return {
    type: types.FETCH_BLOCKS_SUCCESS,
    node,
    res
  }
}

const fetchBlocksFailure = node => {
  return {
    type: types.FETCH_BLOCKS_FAILURE,
    node
  }
}

export function fetchBlocks(node) {
  return async (dispatch) => {
    try {
      dispatch(fetchBlocksStart(node))
      const res = await fetch(`${node.url}/api/v1/blocks`)

      if (res.status >= 400) {
        dispatch(fetchBlocksFailure(node))
      }

      const json = await res.json()

      dispatch(fetchBlocksSuccess(node, json))
    } catch (err) {
      dispatch(fetchBlocksFailure(node))
    }
  }
}
