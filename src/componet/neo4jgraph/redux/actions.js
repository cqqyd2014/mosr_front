import * as ActionTypes from './actionTypes';
export const fullChangeAction = () => ({
    type: ActionTypes.NEO4JGRAPH_FULL,
    payload: {
        full:true,
       
    }
  });
  export const unFullChangeAction = () => ({
    type: ActionTypes.NEO4JGRAPH_UNFULL,
    payload: {
        full:false,
       
    }
  });
  export const neo4jCypherChangeAction = (cypher) => ({
    type: ActionTypes.NEO4JGRPH_CYPHER_CHANGE,
    payload: {
        cypher:cypher,
        
    }
  });
  export const neo4jNodeNessageChangeAction = (node_message) => ({
    type: ActionTypes.NEO4JGRAPH_NODE_MESSAGE,
    payload: {
      node_message:node_message,
        
    }
  });