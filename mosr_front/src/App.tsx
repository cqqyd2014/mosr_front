import React,{useReducer}  from 'react';

import './App.css';
import {Login} from './components/login/Login';
import {MainFrame} from './components/main_frame/MainFrame'
import {globalContext} from './store/global_context'
import {initState as globalState} from './store/global_state'
import {reducer as globalReducer} from './store/global_reducer'


export interface AppProps { compiler: string; framework: string; }
export const App= (props:AppProps) => {
	const [_globalState, _globalDispatch] = useReducer(globalReducer, globalState);
  
    return (
<globalContext.Provider value={{_globalState,_globalDispatch}}>
      <div className="App">
{
	_globalState.isLoggedIn?<MainFrame/>:<Login/>
}
        
      </div>
</globalContext.Provider>
    );
  
}

