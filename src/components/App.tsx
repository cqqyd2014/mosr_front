import * as React from "react";
import { useState,useEffect } from "react"

import './App.css';
import Button from 'antd/es/button';

export interface HelloProps { compiler: string; framework: string; }

export const App = (props: HelloProps) => {
	const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status:{isOnline:boolean}) {
      setIsOnline(status.isOnline);
    }

    console.log('effect');//ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      console.log('cleanup');//ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return (
	<div>
	<h1>Loading...</h1>
	<Button type="primary">Button</Button>
	</div>
);
  }
  return isOnline ? <h1>Online</h1> : <h1>Offline</h1>;
}
