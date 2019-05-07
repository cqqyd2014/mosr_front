import {createStore,combineReducers} from 'redux';
import {reducer as mainFrameReducer} from './main_frame';

const reducer=combineReducers({
    mainFrameReducer: mainFrameReducer,
    
})
const store=createStore(reducer);
export default store;