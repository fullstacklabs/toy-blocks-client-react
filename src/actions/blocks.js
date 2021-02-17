import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes';

const fetchBlocksStart = (node) => {
    return {
        type: types.FETCH_BLOCKS_START,
        node
    }
}

const fetchBlocksSuccess = (node, blocks) => {
    return {
        type: types.FETCH_BLOCKS_SUCCESS,
        node,
        blocks
    }
}

const fetchBlocksFailure = (node) => {
    return {
        type: types.FETCH_BLOCKS_FAILURE,
        node
    }
}

export const fetchBlocks = (node) => {
    return async (dispatch) => {
        try {
            dispatch(fetchBlocksStart(node));
            const result = await fetch(`${node.url}/api/v1/blocks`);

            if (result >= 400) {
                dispatch(fetchBlocksFailure(node));
                return;
            }

            const json = await result.json();
            dispatch(fetchBlocksSuccess(node, json.data));

        } catch (e) {
            dispatch(fetchBlocksFailure(node));
        }
    }
}