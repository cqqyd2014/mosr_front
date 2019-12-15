import * as ActionTypes from './actionTypes';


export const rebuildDataStartAction=(message)=>({
  type:ActionTypes.SYSTEM_REBUILD_DATABASE_START,
  payload:{rebuilding:true,message:message}
}

);
export const rebuildDataEndAction=(old_message,message)=>({
  type:ActionTypes.SYSTEM_REBUILD_DATABASE_END,
  payload:{rebuilding:false,message:message,old_message:old_message}
}

);
export const rebuildDataProcessAction=(old_message,message)=>({
  type:ActionTypes.SYSTEM_REBUILD_DATABASE_PROCESS,
  payload:{message:message,old_message:old_message}
}

);
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
