import { BLOCK_STATUSES } from '../constants/blockStatuses';

export const getNodesBlocks = (state) => state.blocks ?? {};

export const getNodeBlocks = (state, node) => {
  const blocks = getNodesBlocks(state);
  return blocks[node?.url] ?? {};
}

export const blockIsLoading = (state, node) => {
  const block = getNodeBlocks(state, node);
  return block?.status === BLOCK_STATUSES.LOADING
}

export const blockHadFailure = (state, node) => {
  const block = getNodeBlocks(state, node);
  return block?.status === BLOCK_STATUSES.FAILURE
}

export const blockIsIddle = (state, node) => {
  const block = getNodeBlocks(state, node);
  return block?.status === BLOCK_STATUSES.IDDLE
}

