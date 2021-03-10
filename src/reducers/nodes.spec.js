import * as ActionTypes from "../constants/actionTypes";
import reducer from "./nodes";
import initialState from "./initialState";
import { LoadingStatus } from "../constants/enums";

describe("Reducers::Nodes", () => {
  const getInitialState = () => {
    return initialState().nodes;
  };

  const nodeA = {
    url: "http://localhost:3002",
    online: false,
    name: null,
    blocks: {
      loadingStatus: LoadingStatus.NOT_STARTED,
      list: [],
    },
  };

  const nodeB = {
    url: "http://localhost:3003",
    online: false,
    name: null,
    blocks: {
      loadingStatus: LoadingStatus.NOT_STARTED,
      list: [{ id: "001", text: "some value" }],
    },
  };

  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it("should handle CHECK_NODE_STATUS_START", () => {
    const appState = {
      list: [nodeA, nodeB],
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_START, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          loading: true,
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle CHECK_NODE_STATUS_SUCCESS", () => {
    const appState = {
      list: [nodeA, nodeB],
    };
    const action = {
      type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
      node: nodeA,
      res: { node_name: "alpha" },
    };
    const expected = {
      list: [
        {
          ...nodeA,
          online: true,
          name: "alpha",
          loading: false,
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle CHECK_NODE_STATUS_FAILURE", () => {
    const appState = {
      list: [
        {
          ...nodeA,
          online: true,
          name: "alpha",
          loading: false,
        },
        nodeB,
      ],
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_FAILURE, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          online: false,
          name: "alpha",
          loading: false,
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it("Should handle GET_BLOCKS_START", () => {
    const currentState = { list: [nodeA, nodeB] };
    const action = { type: ActionTypes.GET_BLOCKS_START, node: nodeA };
    const expected = { list: [...currentState.list] };

    let nodeIndex = expected.list.findIndex((p) => p.url === action.node.url);
    expected.list[nodeIndex] = {
      ...expected.list[nodeIndex],
      blocks: {
        loadingStatus: LoadingStatus.LOADING,
        list: [],
      },
    };

    expect(reducer(currentState, action)).toEqual(expected);
  });
});
