import { GET_BLOCKS_START, GET_BLOCKS_SUCCESS, GET_BLOCKS_FAILURE } from '../constants/actionTypes';
import initialState from './initialState';

export default function blocksReducer(state = initialState().blocks, action) {
  switch(action.type) {
    case GET_BLOCKS_START: {
      return {
        ...state,
        [action.node]: {
          loading: true,
          error: null
        }
      }
    }
    case GET_BLOCKS_SUCCESS: {
      return {
        ...state,
        [action.node]: {
          loading: false,
          error: null,
          data: action.data
        }
      }
    }
    case GET_BLOCKS_FAILURE: {
      return {
        ...state,
        [action.node]: {
          loading: false,
          error: action.error,
          data: null
        }
      }
    }
    default:
      return state;
  }
}
