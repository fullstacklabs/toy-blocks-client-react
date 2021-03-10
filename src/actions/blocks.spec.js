import * as types from "../constants/actionTypes";
import * as actionCreators from "./blocks";

describe("Blocks actions", () => {
  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  it("Should start fetching blocks correctly", () => {
    const dispatch = jest.fn();
    const expectedVaue = {
      type: types.GET_BLOCKS_START,
      node,
    };

    actionCreators.getBlocks(node)(dispatch);

    expect(dispatch).toBeCalledWith(expectedVaue);
  });
});
