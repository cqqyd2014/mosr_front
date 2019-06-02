import * as ActionTypes from './actionTypes.js';
export default (state = {}, action) => {
    switch(action.type) {
      case ActionTypes.SYSTEM_NODE_LABELS_UPDATE_START: {
       
        let new_state=Object.assign({},state,{'update_labels':'更新中...'});
      return new_state;
      }
      case ActionTypes.SYSTEM_NODE_LABELS_UPDATE_END: {
       
        let node_lables_data=action.payload.node_lables_data;
       
        let new_state=Object.assign({},state,{'update_labels':'更新完成','node_lables_data':node_lables_data});
      return new_state;
      }
      case ActionTypes.SYSTEM_EDGE_TYPES_UPDATE_START: {
       
        let new_state=Object.assign({},state,{'update_types':'更新中...'});
      return new_state;
      }
      case ActionTypes.SYSTEM_EDGE_TYPES_UPDATE_END: {
       
        let edge_types_data=action.payload.edge_types_data;
       
        let new_state=Object.assign({},state,{'update_types':'更新完成','edge_types_data':edge_types_data});
      return new_state;
      }
      case ActionTypes.SYSTEM_PROPERTIES_UPDATE_START: {
       
        let new_state=Object.assign({},state,{'update_properties':'更新中...'});
      return new_state;
      }
      case ActionTypes.SYSTEM_PROPERTIES_UPDATE_END: {
       
        let properties_data=action.payload.properties_data;
       
        let new_state=Object.assign({},state,{'update_properties':'更新完成','properties_data':properties_data});
      return new_state;
      }
      default:
        return state;
    }
  }