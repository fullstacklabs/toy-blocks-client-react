import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./nodes";
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Actions", () => {
  beforeAll(() => {});
  afterAll(() => {});

  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  // it('should create an action to start checking node status', () => {
  //   const actual = ActionCreators.checkNodeStatusStart(node);
  //   const expected = {
  //     type: ActionTypes.CHECK_NODE_STATUS_START,
  //     node
  //   };
  //
  //   expect(actual).toEqual(expected);
  // });

  it("should create an action to save fuel savings", () => {
    const dispatch = jest.fn();
    const expected = {
      type: ActionTypes.CHECK_NODE_STATUS_START,
      node,
    };

    // we expect this to return a function since it is a thunk
    expect(typeof ActionCreators.checkNodeStatus(node)).toEqual("function");
    // then we simulate calling it with dispatch as the store would do
    ActionCreators.checkNodeStatus(node)(dispatch);
    // finally assert that the dispatch was called with our expected action
    expect(dispatch).toBeCalledWith(expected);
  });

  it("should create an action to get blocks", () => {
    const dispatch = jest.fn();
    const expected = {
      type: ActionTypes.GET_NODE_BLOCK_START,
      node,
    };

    expect(typeof ActionCreators.getNodeBlock(node)).toEqual("function");
    ActionCreators.getNodeBlock(node)(dispatch);
    expect(dispatch).toBeCalledWith(expected);
  });

  it("should create an action to start a node status check", () => {
    const expected = {
      type: ActionTypes.CHECK_NODE_STATUS_START,
      node,
    };
    expect(ActionCreators.checkNodeStatusStart(node)).toEqual(expected);
  });

  it("should create an action to signal a success on a node status check", () => {
    const res = "ok";
    const expected = {
      type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
      node,
      res,
    };
    expect(ActionCreators.checkNodeStatusSuccess(node, res)).toEqual(expected);
  });

  it("should create an action to signal a failure when checking a node status", () => {
    const expected = {
      type: ActionTypes.CHECK_NODE_STATUS_FAILURE,
      node,
    };
    expect(ActionCreators.checkNodeStatusFailure(node)).toEqual(expected);
  });

  it("should create an action to signal a pull of node blocks start ", () => {
    const expected = {
      type: ActionTypes.GET_NODE_BLOCK_START,
      node,
    };
    expect(ActionCreators.getNodeBlockStart(node)).toEqual(expected);
  });

  it("should create an action to signal a failure when pull node's blocks", () => {
    const expected = {
      type: ActionTypes.GET_NODE_BLOCK_FAILURE,
      node,
    };
    expect(ActionCreators.getNodeBlockFailure(node)).toEqual(expected);
  });

  it("should create an action to signal success when pulling a node's blocks ", () => {
    const res = "ok";
    const expected = {
      type: ActionTypes.GET_NODE_BLOCK_SUCCESS,
      node,
      res,
    };
    expect(ActionCreators.getNodeBlockSuccess(node, res)).toEqual(expected);
  });

  it("should dispatch async action to get node's block", () => {
    const store = mockStore({});
    const expected = [
      {
        type: ActionTypes.GET_NODE_BLOCK_START,
        node,
      },
      {
        type: ActionTypes.GET_NODE_BLOCK_FAILURE,
        node,
      },
    ];
    store.dispatch(ActionCreators.getNodeBlock(node))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      })    
  });
});
