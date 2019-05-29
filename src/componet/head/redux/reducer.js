import * as ActionTypes from './actionTypes.js';
export default (state = {}, action) => {
    switch(action.type) {
      case ActionTypes.HEAD_MESSAGE_CHANGE: {
        let old_values=state.message;
        let new_value=action.payload.message
        let alter_type_value=action.payload.alter_type
        //console.log(new_value);
        //let new_state_values=Object.assign({},old_values,new_value)
        let new_state=Object.assign({},state,{message:new_value,alter_type:alter_type_value});
      return new_state;
      }
      
      default:
        return state;
    }
  }