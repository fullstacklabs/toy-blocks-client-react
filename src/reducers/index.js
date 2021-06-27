import { combineReducers } from 'redux';
import nodes from './nodes';
import blocks from './blocks';

const rootReducer = combineReducers({
  nodes,
  blocks
});

export default rootReducer;
