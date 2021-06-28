import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import ConnectedBlocks, { Blocks } from "./Blocks";
import Block from "../components/Block";

import {
  CircularProgress,
} from "@material-ui/core";


import initialState from '../reducers/initialState';

import { BLOCK_STATUSES } from '../constants/blockStatuses';
import { getNodeBlocks, blockIsLoading, blockHadFailure, blockIsIddle } from "../selectors/blocks";


const node = {
  url: 'http://localhost',
  online: true,
  name: 'Node 1',
  loading: false
};

const fakeBlock = {
  attributes: {
    data: "Lorem ipsum data",
    hash: "aaaaaaaaaa",
    index: 1,
  },
  id: 1,
  type: "blocks"
}

describe("<Blocks />", () => {

  const getInitialState = () => {
    return initialState().blocks;
  };

  it("Block is in Iddle", () => {
    const newState = getInitialState();
    const props = {
      retryRequest: jest.fn(),
      blocks: getNodeBlocks(newState, node),
      isLoading: blockIsLoading(newState, node),
      isFailured: blockHadFailure(newState, node),
      isIddle: blockIsIddle(newState, node),
    }
    const wrapper = shallow(
      <Blocks node={node} {...props} />
    );
    expect(wrapper.find(Block).length).toEqual(0);
  });

  it("Block is loading", () => {
    const newState = {...getInitialState(), [node.url]: {
      status: BLOCK_STATUSES.LOADING
    }}
    const props = {
      retryRequest: jest.fn(),
      blocks: getNodeBlocks(newState, node),
      isLoading: blockIsLoading(newState, node),
      isFailured: blockHadFailure(newState, node),
      isIddle: blockIsIddle(newState, node),
    }

    const wrapper = shallow(
      <Blocks node={node} {...props} />
    );
    expect(wrapper.find(CircularProgress).length).toEqual(0);
  });

  it("Block had failured", () => {
    const newState = {...getInitialState(), [node.url]: {
      status: BLOCK_STATUSES.FAILURE
    }}
    const props = {
      retryRequest: jest.fn(),
      blocks: getNodeBlocks(newState, node),
      isLoading: blockIsLoading(newState, node),
      isFailured: blockHadFailure(newState, node),
      isIddle: blockIsIddle(newState, node),
    }

    const wrapper = shallow(
      <Blocks node={node} {...props} />
    );
    expect(wrapper.find(CircularProgress).length).toEqual(0);
  });

  it("Block request was successfull", () => {
    const newState = {...getInitialState(), [node.url]: {
      status: BLOCK_STATUSES.SUCCESS,
      data: new Array(3).fill(fakeBlock)
    }}

    const props = {
      retryRequest: jest.fn(),
      blocks: getNodeBlocks(newState, node),
      isLoading: blockIsLoading(newState, node),
      isFailured: blockHadFailure(newState, node),
      isIddle: blockIsIddle(newState, node),
    }

    const wrapper = shallow(
      <Blocks node={node} {...props} />
    );

    expect(wrapper.find(Block).length).toBeGreaterThanOrEqual(0);
  });

  it("should match snapshot", () => {
    const middlewares = [thunk];
    const store = configureMockStore(middlewares)(getInitialState());
    const component = create(
      <Provider store={store}>
        <ConnectedBlocks />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
