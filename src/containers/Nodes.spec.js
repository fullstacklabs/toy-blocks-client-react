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
    checkNodeStatuses: jest.fn(),
    retrieveBlocks: jest.fn()
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

  it("should contain <Node />", () => {
    const wrapper = shallow(
      <Nodes
        actions={actions}
        nodes={nodes}
      />
    );

    expect(wrapper.find(Node).length).toEqual(2);
  });

  it("should match snapshot", () => {
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

  describe("toggleNodeExpanded", () => {
    let node;
    let wrapper;
    beforeAll(() => {
      node = nodes.list[0];
      wrapper = shallow(
        <Nodes
          actions={actions}
          nodes={nodes}
        />
      );
    });

    it("should set expandedNodeURL in the state", () => {
      wrapper.instance().toggleNodeExpanded(node);
      expect(wrapper.state().expandedNodeURL).toBe(node.url);
      expect(actions.retrieveBlocks).toHaveBeenCalledTimes(0);
    });

    it("should call retrieveBlocks", () => {
      node.online = true;
      wrapper.instance().toggleNodeExpanded(node);
      expect(actions.retrieveBlocks).toHaveBeenCalledTimes(1);
      expect(actions.retrieveBlocks).toHaveBeenCalledWith(node);
    });
  });
});
