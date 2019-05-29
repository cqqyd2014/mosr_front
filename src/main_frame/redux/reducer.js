import * as ActionTypes from './actionTypes.js';
export default (state = {}, action) => {

    switch(action.type) {
        /*
      case ActionTypes.NEO4JGRPH_CYPHER_CHANGE: {
          let old_values=state.neo4jgraph;
          console.log(old_values)
          let new_value=({cypher:action.payload.cypher})
          let new_state_values=Object.assign({},old_values,new_value)
          let new_state=Object.assign({},state,{cypher:new_state_values});
        return new_state;
      }
      */
      default:
        return state;
    }
  }