import * as ActionTypes from './actionTypes.js';
export default (state = {}, action) => {
    switch(action.type) {
      case ActionTypes.NEO4JGRAPH_FULL: {
        //let old_values=state.full;
        let new_value=true;
        //let new_state_values=Object.assign({},old_values,new_value)
        let new_state=Object.assign({},state,{full:new_value});
      return new_state;
      }
      case ActionTypes.NEO4JGRAPH_NODE_MESSAGE: {
        //let old_values=state.neo4jgraph_node_message;
        let new_value=action.payload.node_message
        //console.log(new_value);
        //let new_state_values=Object.assign({},old_values,new_value)
        let new_state=Object.assign({},state,{neo4jgraph_node_message:new_value});
      return new_state;
      }
      case ActionTypes.NEO4JGRAPH_UNFULL: {
        //let old_values=state.full;
        let new_value=false;
        //let new_state_values=Object.assign({},old_values,new_value)
        let new_state=Object.assign({},state,{full:new_value});
      return new_state;
    }
      case ActionTypes.NEO4JGRPH_CYPHER_CHANGE: {
        
        //let old_values=state.neo4jgraph_cypher;
        let new_value=action.payload.cypher
        //let new_state_values=Object.assign({},old_values,new_value)
        let new_state=Object.assign({},state,{neo4jgraph_cypher:new_value});
      return new_state;
    }
      
      default:
        return state;
    }
  }