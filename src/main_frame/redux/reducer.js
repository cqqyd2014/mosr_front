
export default (state = {}, action) => {

    switch(action.type) {
        /*
      case ActionTypes.DYNAMICCOL_VALUE_CHANGE: {
          let old_form_values=state.dynamic_form_values;
          let new_value=({[action.payload.col_name]:action.payload.col_value})
          let new_form_values=Object.assign({},old_form_values,new_value)
          let new_state=Object.assign({},state,{dynamic_form_values:new_form_values});
        return new_state;
      }
      */
      default:
        return state;
    }
  }