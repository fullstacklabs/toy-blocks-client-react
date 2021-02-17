import * as ActionTypes from '../constants/actionTypes';
import * as ActionCreators from './blocks';

describe('Actions', () => {
  beforeAll(() => {});
  afterAll(() => {});

  const node = {
    url: 'http://localhost:3002',
    online: false,
    name: null
  };

  const blocks = [
    {
      id: "5",
      type: "blocks",
      attributes: {
        index: 1,
        timestamp: 1530679678,
        data: "The Human Torch"
      }
    }
  ];

  it('should create an action to start retrieving node blocks', () => {
    const actual = ActionCreators.retrieveBlocksStart(node);
    const expected = {
      type: ActionTypes.RETRIEVE_BLOCKS_START,
      node
    };

    expect(actual).toEqual(expected);
  });

  it('should create an action for retrieving node blocks success', () => {
    const actual = ActionCreators.retrieveBlocksSuccess(node, blocks);
    const expected = {
      type: ActionTypes.RETRIEVE_BLOCKS_SUCCESS,
      node,
      blocks
    };

    expect(actual).toEqual(expected);
  });

  it('should create an action for retrieving node blocks failure', () => {
    const actual = ActionCreators.retrieveBlocksFailure(node);
    const expected = {
      type: ActionTypes.RETRIEVE_BLOCKS_FAILURE,
      node
    };

    expect(actual).toEqual(expected);
  });

  it('should create an action to retrieve blocks', () => {
    const dispatch = jest.fn();
    const expected = {
      type: ActionTypes.RETRIEVE_BLOCKS_START,
      node
    };

    // we expect this to return a function since it is a thunk
    expect(typeof (ActionCreators.retrieveBlocks(node))).toEqual('function');
    // then we simulate calling it with dispatch as the store would do
    ActionCreators.retrieveBlocks(node)(dispatch);
    // finally assert that the dispatch was called with our expected action
    expect(dispatch).toBeCalledWith(expected);
  });
});
