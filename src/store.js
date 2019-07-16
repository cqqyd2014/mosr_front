import {createStore,combineReducers} from 'redux';
import {reducer as mainFrameReducer} from './main_frame';

import {reducer as HeadReducer} from './componet/head';
import {reducer as SystemReducer} from './componet/system';
import {reducer as CytoscapejsReducer} from './componet/cytoscapejs';

const reducer=combineReducers({
    mainFrameReducer: mainFrameReducer,

    HeadReducer:HeadReducer,
    SystemReducer:SystemReducer,
    CytoscapejsReducer:CytoscapejsReducer,


    
})
const store=createStore(reducer);
export default store;