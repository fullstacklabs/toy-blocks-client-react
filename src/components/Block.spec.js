import { create } from "react-test-renderer";
import React from "react";
import Block from "./Block";

describe("<Block />", () => {
  it("should match snapshot", () => {
    const component = create(<Block attributes={{ index: 1, data: "Some descript" }} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
