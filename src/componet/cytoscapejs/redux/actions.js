import * as ActionTypes from './actionTypes';
export const fullChangeAction = () => ({
    type: ActionTypes.CYTOSCAPEJS_FULL,
    payload: {
        full:true,
       
    }
  });
  export const unFullChangeAction = () => ({
    type: ActionTypes.CYTOSCAPEJS_UNFULL,
    payload: {
        full:false,
       
    }
  });
  export const neo4jCypherChangeAction = (cypher) => ({
    type: ActionTypes.CYTOSCAPEJS_CYPHER_CHANGE,
    payload: {
        cypher:cypher,
        
    }
  });
  export const neo4jNodeNessageChangeAction = (node_message) => ({
    type: ActionTypes.CYTOSCAPEJS_NODE_MESSAGE,
    payload: {
      node_message:node_message,
        
    }
  });