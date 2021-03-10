import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import ConnectedNodes, { Nodes } from "./Nodes";
import Node from "../components/Node";
import { LoadingStatus } from "../constants/enums";

describe("<Nodes />", () => {
  const actions = {
    checkNodeStatuses: jest.fn(),
  };

  const nodes = {
    list: [
      {
        url: "https://thawing-springs-53971.herokuapp.com",
        online: false,
        name: "Node 1",
        loading: false,
        blocks: {
          loadingStatus: LoadingStatus.NOT_STARTED,
          list: [],
        },
      },
      {
        url: "https://secret-lowlands-62331.herokuapp.com",
        online: false,
        name: "Node 2",
        loading: false,
        blocks: {
          loadingStatus: LoadingStatus.NOT_STARTED,
          list: [],
        },
      },
    ],
  };

  it("should contain <Node />", () => {
    const wrapper = shallow(<Nodes actions={actions} nodes={nodes} />);

    expect(wrapper.find(Node).length).toEqual(2);
  });

  it("should match snapshot", () => {
    const middlewares = [thunk];
    const store = configureMockStore(middlewares)({ nodes });
    const component = create(
      <Provider store={store}>
        <ConnectedNodes />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
