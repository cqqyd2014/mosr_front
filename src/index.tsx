import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";



if ((module as any).hot) {
	
	module.hot.accept(() => {
		ReactDOM.render(
			<Hello compiler="TypeScript" framework="React" />,
			document.getElementById("mosr_index") as HTMLElement
		)
	})
};

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("mosr_index") as HTMLElement
);