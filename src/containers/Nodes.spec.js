import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import ConnectedNodes, { Nodes } from "./Nodes";
import Node from "../components/Node";

describe("<Nodes />", () => {
  const actions = {
    checkNodeStatuses: jest.fn()
  };

  const nodes = {
    list: [
      {
        url: 'https://thawing-springs-53971.herokuapp.com',
        online: false,
        name: 'Node 1',
        loading: false
      },
      {
        url: 'https://secret-lowlands-62331.herokuapp.com',
        online: false,
        name: 'Node 2',
        loading: false
      }
    ]
  };

  const nodesLoading = {
    list: [
      {
        url: 'https://thawing-springs-53971.herokuapp.com',
        online: false,
        name: 'Node 1',
        loading: true
      },
      {
        url: 'https://secret-lowlands-62331.herokuapp.com',
        online: false,
        name: 'Node 2',
        loading: true
      }
    ]
  }

  const nodesOnlineFetching = {
    list: [
      {
        url: 'https://thawing-springs-53971.herokuapp.com',
        online: true,
        name: 'Node 1',
        loading: false,
        fetching: true
      },
      {
        url: 'https://secret-lowlands-62331.herokuapp.com',
        online: true,
        name: 'Node 2',
        loading: false,
        fetching: true
      }
    ]
  }

  const nodesBlock = {
    list: [
      {
        url: 'https://thawing-springs-53971.herokuapp.com',
        online: true,
        name: 'Node 1',
        loading: false,
        fetching: false,
        blocks: [
          { id: 2, attributes: { data: 'hi i am data2 '} },
          { id: 3, attributes: { data: 'hi i am data definetly data '} }
        ]
      },
      {
        url: 'https://secret-lowlands-62331.herokuapp.com',
        online: true,
        name: 'Node 2',
        loading: false,
        fetching: false,
        blocks: [
          { id: 1, attributes: { data: 'hi i am data '} }
        ]
      }
    ]
  }

  it("should contain <Node />", () => {
    const wrapper = shallow(
      <Nodes
        actions={actions}
        nodes={nodes}
      />
    );

    expect(wrapper.find(Node).length).toEqual(2);
  });

  it("should match default snapshot", () => {
    const middlewares = [thunk];
    const store = configureMockStore(middlewares)({nodes});
    const component = create(
      <Provider store={store}>
        <ConnectedNodes />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should match loading snapshot", () => {
    const middlewares = [thunk];
    const store = configureMockStore(middlewares)({nodes: nodesLoading});
    const component = create(
      <Provider store={store}>
        <ConnectedNodes />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
  
  it("should match fetching snapshot", () => {
    const middlewares = [thunk];
    const store = configureMockStore(middlewares)({ nodes: nodesOnlineFetching});
    const component = create(
      <Provider store={store}>
        <ConnectedNodes />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should match loaded snapshot", () => {
    const middlewares = [thunk];
    const store = configureMockStore(middlewares)({ nodes: nodesBlock});
    const component = create(
      <Provider store={store}>
        <ConnectedNodes />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

});
