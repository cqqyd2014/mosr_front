import * as ActionTypes from './actionTypes';
export const nodeLablesUpdateStartAction = () => ({

 
  type: ActionTypes.SYSTEM_NODE_LABELS_UPDATE_START,
  payload: {
      
     
  }
});
export const nodeLablesUpdateEndAction = (node_lables_data,edge_types_data,properties_data) => ({


  type: ActionTypes.SYSTEM_NODE_LABELS_UPDATE_END,
  payload: {
    node_lables_data:node_lables_data,
    edge_types_data:edge_types_data,
    properties_data:properties_data,
     
  }
});