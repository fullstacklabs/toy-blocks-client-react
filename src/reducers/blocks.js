import {
  FETCH_BLOCK_STATUS_START,
  FETCH_BLOCK_STATUS_SUCCESS,
  FETCH_BLOCK_STATUS_FAILURE
} from '../constants/actionTypes';

import { BLOCK_STATUSES } from '../constants/blockStatuses';

import initialState from './initialState';

export default function nodesReducer(state = initialState().blocks, action) {
  const storedNode = state?.blocks?.[action?.node] ?? {};
  switch (action.type) {
    case FETCH_BLOCK_STATUS_START:
      return {
        ...state,
        [action.node]: {
          ...storedNode,
          status: BLOCK_STATUSES.LOADING,
        }
      };
    case FETCH_BLOCK_STATUS_SUCCESS:
      return {
        ...state,
        [action.node]: {
          ...storedNode,
          status: BLOCK_STATUSES.SUCCESS,
          data: action.data,
        }
      };
    case FETCH_BLOCK_STATUS_FAILURE:
      return {
        ...state,
        [action.node]: {
          status: BLOCK_STATUSES.FAILURE,
          data: action.data ?? null,
        }
      };
    default:
      return state;
  }
}
