import * as ActionTypes from '../constants/actionTypes';

import configureStore from './configureStore';

describe('Store', () => {
  const nodes = {
    list: [
      { url: 'a.com', online: false, name: null, loading: false, blocks: [] },
      { url: 'b.com', online: false, name: null, loading: false, blocks: [] },
      { url: 'c.com', online: false, name: null, loading: false, blocks: [] },
      { url: 'd.com', online: false, name: null, loading: false, blocks: [] }
    ]
  };

  beforeAll(() => {});
  afterAll(() => {});

  it('should display results when necessary data is provided', () => {
    const store = configureStore({nodes});

    const actions = [
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {node_name: 'alpha'}, blocks: {data: []}},
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[1], res: {node_name: 'beta'}, blocks: {data: []} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {node_name: 'gamma'}, blocks: {data: []} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[2], res: {node_name: 'delta'}, blocks: {data: []} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[1], res: {node_name: 'epsilon'}, blocks: {data: []} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {node_name: 'zeta'}, blocks: {data: []} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {node_name: 'eta'}, blocks: {data: []} },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: {node_name: 'theta'}, blocks: {data: []} },
    ];
    actions.forEach(action => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      list: [
        { url: 'a.com', online: true, name: 'theta', loading: false, blocks: [] },
        { url: 'b.com', online: true, name: 'epsilon', loading: false, blocks: [] },
        { url: 'c.com', online: true, name: 'delta', loading: false, blocks: [] },
        { url: 'd.com', online: false, name: null, loading: false, blocks: [] }
      ]
    };

    expect(actual.nodes).toEqual(expected);
  });
});
