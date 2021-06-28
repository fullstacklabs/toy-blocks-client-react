import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./blocks";
import mockFetch from "cross-fetch";

jest.mock("cross-fetch");

const fakeBlock = {
  attributes: {
    data: "Lorem ipsum data",
    hash: "aaaaaaaaaa",
    index: 1,
  },
  id: 1,
  type: "blocks"
}

describe("Actions::Blocks", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockFetch.mockClear();
  });

  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  it("should fetch the blocks list", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          const data = [ fakeBlock ]
          return Promise.resolve({ data });
        },
      })
    );
    await ActionCreators.fetchBlocksList(node.url)(dispatch);

    const expected = [
      {
        type: ActionTypes.FETCH_BLOCK_STATUS_START,
        node: node.url,
      },
      {
        type: ActionTypes.FETCH_BLOCK_STATUS_SUCCESS,
        node: node.url,
        data: [fakeBlock]
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.fetchBlocksList(node.url)(dispatch);

    const expected = [
      {
        type: ActionTypes.FETCH_BLOCK_STATUS_START,
        node: node.url,
      },
      {
        type: ActionTypes.FETCH_BLOCK_STATUS_FAILURE,
        node: node.url,
        data: null,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });
});
