import React from "react";
import { LoadingStatus } from "../constants/enums";
import Blocks from "./Blocks";
import { shallow, mount } from "enzyme";
import { CircularProgress } from "@material-ui/core";
import Block from "../components/Block";

const nodeList = [
  {
    url: "a.com",
    blocks: {
      loadingStatus: LoadingStatus.NOT_STARTED,
      list: [],
    },
  },
  {
    url: "a.com",
    blocks: {
      loadingStatus: LoadingStatus.LOADING,
      list: [],
    },
  },
  {
    url: "a.com",
    blocks: {
      loadingStatus: LoadingStatus.FAILURE,
      list: [],
    },
  },
  {
    url: "a.com",
    blocks: {
      loadingStatus: LoadingStatus.FINISHED,
      list: [
        { id: "001", text: "text 1" },
        { id: "002", text: "text 2" },
      ],
    },
  },
];

describe("<Blocks />", () => {
  it("Should not have children nodes", () => {
    const wrapper = shallow(<Blocks node={nodeList[0]} />);

    expect(wrapper.children().length).toBe(0);
  });

  it("Should show progress", () => {
    const wrapper = shallow(<Blocks node={nodeList[1]} />);

    expect(wrapper.find(CircularProgress).length).toBe(1);
  });

  it("Should show error", () => {
    const wrapper = shallow(<Blocks node={nodeList[2]} />);

    expect(wrapper.find("h3").length).toBe(1);
  });

  it("Should have block nodes", () => {
    const wrapper = mount(<Blocks node={nodeList[3]} />);

    expect(wrapper.find(Block).length).toBe(2);
  });
});
