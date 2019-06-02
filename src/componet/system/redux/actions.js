import * as ActionTypes from './actionTypes';
export const nodeLablesUpdateStartAction = () => ({

 
  type: ActionTypes.SYSTEM_NODE_LABELS_UPDATE_START,
  payload: {
      
     
  }
});
export const nodeLablesUpdateEndAction = (node_lables_data) => ({


  type: ActionTypes.SYSTEM_NODE_LABELS_UPDATE_END,
  payload: {
    node_lables_data:node_lables_data,
     
  }
});

export const edgeTypesUpdateStartAction = () => ({

 
  type: ActionTypes.SYSTEM_EDGE_TYPES_UPDATE_START,
  payload: {
      
     
  }
});
export const edgeTypesUpdateEndAction = (edge_types_data) => ({


  type: ActionTypes.SYSTEM_EDGE_TYPES_UPDATE_END,
  payload: {
    edge_types_data:edge_types_data,
     
  }
});

export const propertiesUpdateStartAction = () => ({

 
  type: ActionTypes.SYSTEM_PROPERTIES_UPDATE_START,
  payload: {
      
     
  }
});
export const propertiesUpdateEndAction = (properties_data) => ({


  type: ActionTypes.SYSTEM_PROPERTIES_UPDATE_END,
  payload: {
    properties_data:properties_data,
     
  }
});
