import * as ActionTypes from '../constants/actionTypes';
import reducer from './blocks';
import initialState from './initialState';

import { BLOCK_STATUSES } from '../constants/blockStatuses'

const fakeBlock = {
  attributes: {
    data: "Lorem ipsum data",
    hash: "aaaaaaaaaa",
    index: 1,
  },
  id: 1,
  type: "blocks"
}

describe('Reducers::Blocks', () => {
  const getInitialState = () => {
    return initialState().blocks;
  };

  const node = {
    url: 'http://localhost:3002',
    online: false,
    name: null
  };

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle FETCH_BLOCK_STATUS_START', () => {
    const action = {
      type: ActionTypes.FETCH_BLOCK_STATUS_START,
      node: node.url
    };
    const appState = {};
    const expected = {
      [action.node]: {
        status: BLOCK_STATUSES.LOADING,
      }
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle FETCH_BLOCK_STATUS_SUCCESS', () => {
    const action = {
      type: ActionTypes.FETCH_BLOCK_STATUS_SUCCESS,
      node: node.url,
      data: [
        fakeBlock
      ]
    };
    const appState = {
      [action.node]: {
        status: BLOCK_STATUSES.LOADING,
      }
    };
    const expected = {
      [action.node]: {
        status: BLOCK_STATUSES.SUCCESS,
        data: action.data
      }
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle FETCH_BLOCK_STATUS_FAILURE', () => {
    const action = {
      type: ActionTypes.FETCH_BLOCK_STATUS_FAILURE,
      node: node.url,
      data: null,
    };
    const appState = {
      [action.node]: {
        status: BLOCK_STATUSES.LOADING,
      }
    };
    const expected = {
      [action.node]: {
        status: BLOCK_STATUSES.FAILURE,
        data: action.data
      }
    };

    expect(reducer(appState, action)).toEqual(expected);
  });
});
