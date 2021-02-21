import Node from "./Node";
import React from "react";
import axios from "axios";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("axios");

axios.get = jest.fn();

const node = {
  url: "http://localhost",
  online: true,
  name: "Name",
  loading: false,
};

describe("<Node />", () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  describe("when is expanded", () => {
    describe("when is online", () => {
      it("should request /api/v1/blocks", () => {
        axios.get.mockReturnValueOnce(Promise.resolve({ data: { data: [] } }));

        render(<Node node={node} expanded={true} toggleNodeExpanded={() => { }} />);

        expect(axios.get).toBeCalledWith("http://localhost/api/v1/blocks");
      })

      it("should show spinner properly", async () => {
        axios.get.mockReturnValueOnce(Promise.resolve({ data: { data: [] } }));

        const { queryByTestId } = render(<Node node={node} expanded={true} toggleNodeExpanded={() => { }} />);

        expect(queryByTestId("spinner")).not.toBeNull();

        await axios.get();

        expect(queryByTestId("spinner")).toBeNull();
      });

      it("should show empty message when there is no blocks", async () => {
        axios.get.mockReturnValueOnce(Promise.resolve({ data: { data: [] } }));

        const { queryByTestId } = render(<Node node={node} expanded={true} toggleNodeExpanded={() => { }} />);

        await axios.get();

        expect(queryByTestId("empty")).not.toBeNull();
      });

      it("should show blocks properly", async () => {
        axios.get.mockReturnValueOnce(Promise.resolve({
          data: {
            data: [{
              id: "1",
              attributes: {
                index: 1,
                data: "Block"
              }
            }]
          }
        }));

        const { queryByTestId, getByText } = render(<Node node={node} expanded={true} toggleNodeExpanded={() => { }} />);

        expect(queryByTestId("spinner")).not.toBeNull();

        await axios.get();

        expect(queryByTestId("spinner")).toBeNull();
        expect(queryByTestId("empty")).toBeNull();

        expect(getByText("001")).not.toBeNull();
        expect(getByText("Block")).not.toBeNull();
      });
    });

    describe("when is not online", () => {
      it("should not call /api/v1/blocks", async () => {
        axios.get.mockReturnValueOnce(Promise.resolve({ data: { data: [] } }));

        render(<Node node={{ ...node, online: false }} expanded={true} toggleNodeExpanded={() => { }} />);

        expect(axios.get).not.toBeCalled();
      });
    });
  });

  describe("when is not expanded", () => {
    it("should not call /api/v1/blocks", async () => {
      axios.get.mockReturnValueOnce(Promise.resolve({ data: { data: [] } }));

      render(<Node node={node} expanded={false} toggleNodeExpanded={() => { }} />);

      expect(axios.get).not.toBeCalled();
    });
  });
});
