import React from "react";
import { shallow } from "enzyme";
import { Typography } from "@material-ui/core";
import Blocks from "./Blocks";

describe("<Blocks />", () => {

  it("should render error", () => {
    const wrapper = shallow(<Blocks data={undefined}/>);

    const { children: errorMessage } = wrapper.find(Typography).props();

    expect(errorMessage).toEqual("Error getting blocks");
  });

  it("should render empty blocks response", () => {
    const wrapper = shallow(<Blocks data={[]}/>);

    const { children: emptyMessage } = wrapper.find(Typography).props();

    expect(emptyMessage).toEqual("Node does not have blocks");
  });

  it("should render blocks content", () => {
    const blocks = [
      {
        id: 1,
        attributes: {
          data: "Test",
        },
      },
    ];
    const wrapper = shallow(<Blocks data={blocks} />);

    const { children: identifier } = wrapper.find(Typography).at(0).props();

    const { children: data } = wrapper.find(Typography).at(1).props();

    expect(identifier).toBe("001");
    expect(data).toBe("Test");
  });
});
