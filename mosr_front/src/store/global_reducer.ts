
import {InterAction} from './action'
import {interInitState} from './global_state'


export function reducer(state:interInitState, action:InterAction):interInitState {
        switch(action.type) {
            case 'login_success':
                return {
                    ...state,
                    isLoggedIn: true,
                    
                }
            
            default: 
                return state;
        }
    }