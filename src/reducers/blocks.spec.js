import * as actionTypes from '../constants/actionTypes';
import initialState from './initialState';
import reducer from './blocks';

describe('Reducer::Blocks', ()=> {
 const getInitialState = () => {
   return initialState().blocks;
 }

 it('set initial states by default', () =>{
   const action = {type: 'invalid'}
   const expected = getInitialState();

   expect(reducer(undefined, action)).toEqual(expected);
 })
 const node = 'http://test.com';

 it('should handle GET_BLOCKS_START', ()=> {
   const appState = getInitialState();
   const action = { type: actionTypes.GET_BLOCKS_START, node};
   const expected = {
     [action.node]: {
       loading: true,
       error: null
     }
   };
   expect(reducer(appState, action)).toEqual(expected);
 });

 it('should handle GET_BLOCKS_SUCCESS', () => {
   const appState = {
    [node]: {
      loading: true,
      error: null
    }
   }
   const mock = {
     id: 1,
     type: 'Blocks',
     attributes: {
       index: 1,
       data: 'Mock Blocks'
     }
   };

   const action = {
     type: actionTypes.GET_BLOCKS_SUCCESS,
     node,
     data: mock
   };

   const expected = {
    [node]: {
      loading: false,
      error: null,
      data: mock
    }
   }
   expect(reducer(appState, action)).toEqual(expected);
 });

 it('should handle GET_BLOCKS_FAILURE', () => {
   const appState = {
    [node]: {
      loading: true,
      error: null
    }
   };

   const error = 'Error message';
   const action = {
     type: actionTypes.GET_BLOCKS_FAILURE,
     node,
     error
   };

   const expected = {
    [node]: {
      loading: false,
      error,
      data: null
    }
   }
   expect(reducer(appState, action)).toEqual(expected);
 })

})
