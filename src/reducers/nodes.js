import * as types from "../constants/actionTypes";
import initialState from "./initialState";
import cloneDeep from "clone-deep";
import { LoadingStatus } from "../constants/enums";

export default function nodesReducer(state = initialState().nodes, action) {
  let list, nodeIndex;

  const getNewState = (loadingStatus, list) => {
    let newState = cloneDeep(state);
    let nodeIndex = state.list.findIndex((p) => p.url === action.node.url);

    newState.list[nodeIndex] = {
      ...newState.list[nodeIndex],
      blocks: {
        loadingStatus,
        list: list.map((block) => {
          return {
            id: block.id.toString().padStart(3, "0"),
            text: block.attributes.data,
          };
        }),
      },
    };

    return newState;
  };

  switch (action.type) {
    case types.CHECK_NODE_STATUS_START:
      list = state.list;
      nodeIndex = state.list.findIndex((p) => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            loading: true,
          },
          ...state.list.slice(nodeIndex + 1),
        ];
      }
      return {
        ...state,
        list,
      };
    case types.CHECK_NODE_STATUS_SUCCESS:
      list = state.list;
      nodeIndex = state.list.findIndex((p) => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: true,
            name: action.res.node_name,
            loading: false,
          },
          ...state.list.slice(nodeIndex + 1),
        ];
      }
      return {
        ...state,
        list,
      };
    case types.CHECK_NODE_STATUS_FAILURE:
      list = state.list;
      nodeIndex = state.list.findIndex((p) => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: false,
            loading: false,
          },
          ...state.list.slice(nodeIndex + 1),
        ];
      }
      return {
        ...state,
        list,
      };
    case types.GET_BLOCKS_START:
      return getNewState(LoadingStatus.LOADING, []);
    case types.GET_BLOCKS_FAILURE:
      return getNewState(LoadingStatus.FAILURE, []);
    case types.GET_BLOCKS_SUCCESS:
      return getNewState(LoadingStatus.FINISHED, action.blocks);
    default:
      return state;
  }
}
