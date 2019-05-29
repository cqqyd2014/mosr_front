import * as ActionTypes from './actionTypes';
export const headMessageChangeAction = (message,alter_type) => ({
    /*
    /*
    'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
  */
 
    type: ActionTypes.HEAD_MESSAGE_CHANGE,
    payload: {
        message:message,
        alter_type:alter_type,
       
    }
  });
