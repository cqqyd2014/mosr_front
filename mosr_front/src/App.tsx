import React,{useReducer}  from 'react';

import './App.css';
import {store} from './store/store'
import {Login} from './components/login/Login';
import {globalContext} from './store/global_context'
import {initState as globalState} from './store/global_state'
import {reducer as globalReducer} from './store/global_reducer'


export interface AppProps { compiler: string; framework: string; }
export const App= (props:AppProps) => {
	const [_globalState, _globalDispatch] = useReducer(globalReducer, globalState);
  
    return (
<globalContext.Provider value={{_globalState,_globalDispatch}}>
      <div className="App">
        <Login/>
      </div>
</globalContext.Provider>
    );
  
}

