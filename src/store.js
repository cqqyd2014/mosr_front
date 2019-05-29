import {createStore,combineReducers} from 'redux';
import {reducer as mainFrameReducer} from './main_frame';
import {reducer as neo4jGraphReducer} from './componet/neo4jgraph';
import {reducer as HeadReducer} from './componet/head';
import {reducer as SystemReducer} from './componet/system';

const reducer=combineReducers({
    mainFrameReducer: mainFrameReducer,
    neo4jGraphReducer:neo4jGraphReducer,
    HeadReducer:HeadReducer,
    SystemReducer:SystemReducer,


    
})
const store=createStore(reducer);
export default store;