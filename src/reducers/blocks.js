import {
  FETCH_BLOCK_STATUS_START,
  FETCH_BLOCK_STATUS_SUCCESS,
  FETCH_BLOCK_STATUS_FAILURE
} from '../constants/actionTypes';

import { BLOCK_STATUSES } from '../constants/blockStatuses';

import initialState from './initialState';

export default function nodesReducer(state = initialState().blocks, action) {
  switch (action.type) {
    case FETCH_BLOCK_STATUS_START:
      return {
        ...state,
        [action.node]: {
          ...action,
          status: BLOCK_STATUSES.LOADING,
        }
      };
    case FETCH_BLOCK_STATUS_SUCCESS:
      return {
        ...state,
        [action.node]: {
          ...action,
          status: BLOCK_STATUSES.SUCCESS,
        }
      };
    case FETCH_BLOCK_STATUS_FAILURE:
      return {
        ...state,
        [action.node]: {
          ...action,
          status: BLOCK_STATUSES.FAILURE,
        }
      };
    default:
      return state;
  }
}
