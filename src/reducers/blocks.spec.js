import * as ActionTypes from '../constants/actionTypes';
import reducer from './nodes';

describe('Reducers::Blocks', () => {

  const nodeC = {
    url: 'http://localhost:3002',
    online: false,
    name: null,
    loading: false,
    blocks: {}
  };

  const nodeD = {
    url: 'http://localhost:3003',
    online: true,
    name: 'Node 1',
    loading: false,
    blocks: {}
  };

  it('should handle GET_BLOCK_NODE_STATUS_START', () => {
    const appState = {
      list: [nodeC, nodeD]
    };
    const action = { type: ActionTypes.GET_BLOCK_NODE_STATUS_START, nodeUrl: nodeD.url };
    const expected = {
      list: [
        nodeC,
        {
          ...nodeD,
          blocks: {
            loading: true,
            errorFetch: false,
            data: []
          }
        }
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_BLOCK_NODE_STATUS_SUCCESS', () => {
    const appState = {
      list: [nodeC, nodeD]
    };
    
    const blocksData = [
      {
        attributes: {
          index: 1,
          data: "Block 1",
          hash: "hash20201003-1"
        },
        id: 2,
        type: "blocks"
      },
      {
        attributes: {
          index: 2,
          data: "Block 2",
          hash: "hash20201003-2"
        },
        id: 2,
        type: "blocks"
      }
    ];

    const action = {
      type: ActionTypes.GET_BLOCK_NODE_STATUS_SUCCESS,
      nodeUrl: nodeD.url,
      res: {
        data: blocksData
      }
    };

    const expected = {
      list: [
        nodeC,
        {
          ...nodeD,
          blocks: {
            loading: false,
            errorFetch: false,
            data: blocksData
          }
        }
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_BLOCK_NODE_STATUS_FAILURE', () => {
    const appState = {
      list: [nodeC, {
        ...nodeD,
        loading: false,
        blocks: {
          loading: false,
          errorFetch: false,
          data: []
        }
      }]
    };

    const action = {
      type: ActionTypes.GET_BLOCK_NODE_STATUS_FAILURE,
      nodeUrl: nodeD.url,
    };

    const expected = {
      list: [
        nodeC,
        {
          ...nodeD,
          loading: false,
          blocks: {
            loading: false,
            errorFetch: true,
            data: []
          }
        }
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });
})