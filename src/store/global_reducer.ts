
import {InterAction} from './action'
import {interInitState} from './global_state'


export function reducer(state:interInitState, action:InterAction):interInitState {
        switch(action.type) {
            case 'login_success':
                return {
                    ...state,
                    isLoggedIn: true,
					permission:action.payload.permission,
					user_name:action.payload.user_name,
					nickname:action.payload.nickname,
					user_last_login_datetime:action.payload.user_last_login_datetime,
					user_uuid:action.payload.u_uuid
                    
                }
			case 'logout':
				return {
					...state,isLoggedIn:false
				}
            
            default: 
                return state;
        }
    }