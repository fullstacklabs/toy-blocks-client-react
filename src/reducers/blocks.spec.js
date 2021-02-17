import * as ActionTypes from '../constants/actionTypes';
import reducer from './nodes';

describe('', () => {
    const nodeA = {
        url: 'https://nodea.com'
    }

    const nodeB = {
        url: 'https://nodeb.com'
    }


    it('handle FETCH_BLOCK_START', () => {
        const state = {
            list : [nodeA, nodeB]
        }

        const action = {
            type: ActionTypes.FETCH_BLOCKS_START,
            node: nodeA
        }

        const expected = {
            list : [
                {
                    ...nodeA,
                    blocks:{
                        loading: true,
                        error: false,
                        data: []
                    }
                },
                nodeB
            ]
        }

        expect(reducer(state, action)).toEqual(expected);
    });
    
    it('handle FETCH_BLOCK_SUCCESS', () => {
        const state = {
            list : [nodeA, nodeB]
        }

        const mock = [
            {
                id: '1',
                attributes: {
                    index: 1,
                    data: 'mock block 1'
                }
            },
            {
                id: '2',
                attributes: {
                    index: 2,
                    data: 'mock block 2'
                }
            }
        ]


        const action = {
            type: ActionTypes.FETCH_BLOCKS_SUCCESS,
            node: nodeB,
            blocks: mock
        }

        const expected = {
            list: [
                nodeA,
                {
                    ...nodeB,
                    blocks: {
                        loading: false,
                        error: false,
                        data: mock
                    }
                }
            ]
        }

        expect(reducer(state, action)).toEqual(expected);
    });
    
    it('handle FETCH_BLOCK_FAILRE', () => {
        const state = {
            list : [nodeA, nodeB]
        }

        const action = {
            type: ActionTypes.FETCH_BLOCKS_FAILURE,
            node: nodeA
        }

        const expected = {
            list : [
                {
                    ...nodeA,
                    blocks:{
                        loading: false,
                        error: true,
                        data: []
                    }
                },
                nodeB
            ]
        }

        expect(reducer(state, action)).toEqual(expected);
    });
});