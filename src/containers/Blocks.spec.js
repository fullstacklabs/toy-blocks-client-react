import React from "react";
import { shallow } from "enzyme";
import Blocks from "./Blocks";
import Block from "../components/Block";

describe("<Blocks />", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <Blocks blocks={[]} />
    );
  });

  it("should contain <Blocks />", () => {
    expect(wrapper.find('.blocks').length).toBe(1);
  });

  it("should contain empty blocks text", () => {
    expect(wrapper.find('.empty-blocks').length).toBe(1);
  });

  it("should contain <Block />", () => {
    const blocks = [{ id: '5' }];
    wrapper = shallow(
      <Blocks blocks={blocks} />
    );
    expect(wrapper.find(Block).length).toBe(1);
  });
});
