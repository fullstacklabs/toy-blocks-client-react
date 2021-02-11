import * as ActionTypes from '../constants/actionTypes'
import reducer from './nodes'

describe('Reducers::Blocks', () => {
  const nodeA = {
    url: 'http://localhost:3002',
    name: null,
    blocks: {
      loading: false,
      error: false,
      data: []
    }
  }

  const nodeB = {
    url: 'http://localhost:3003',
    name: null,
    blocks: {
      loading: false,
      error: false,
      data: []
    }
  }

  it('should handle FETCH_BLOCKS_START', () => {
    const appState = {
      list: [nodeA, nodeB]
    }

    const action = {
      type: ActionTypes.FETCH_BLOCKS_START,
      node: nodeA
    }

    const expected = {
      list: [
        {
          ...nodeA,
          blocks: {
            loading: true,
            error: false,
            data: []
          }
        },
        nodeB
      ]
    }

    expect(reducer(appState, action)).toEqual(expected)
  })

  it('should handle FETCH_BLOCKS_SUCCESS', () => {
    const appState = {
      list: [nodeA, nodeB]
    }

    const mockedData = [
      {
        id: '1',
        type: 'blocks',
        attributes: {
          index: 1,
          timestamp: 1530679678,
          data: 'The Human Torch'
        }
      },
      {
        id: '2',
        type: 'blocks',
        attributes: {
          index: 1,
          timestamp: 1530679684,
          data: 'is denied'
        }
      }
    ]

    const action = {
      type: ActionTypes.FETCH_BLOCKS_SUCCESS,
      node: nodeA,
      res: {
        node_name: 'Node A',
        data: mockedData
      }
    }

    const expected = {
      list: [
        {
          ...nodeA,
          blocks: {
            loading: false,
            error: false,
            data: mockedData
          }
        },
        nodeB
      ]
    }

    expect(reducer(appState, action)).toEqual(expected)
  })

  it('should handle FETCH_BLOCKS_FAILURE', () => {
    const appState = {
      list: [nodeA, nodeB]
    }

    const action = {
      type: ActionTypes.FETCH_BLOCKS_FAILURE,
      node: nodeA
    }

    const expected = {
      list: [
        {
          ...nodeA,
          blocks: {
            loading: false,
            error: true,
            data: []
          }
        },
        nodeB
      ]
    }

    expect(reducer(appState, action)).toEqual(expected)
  })
})
