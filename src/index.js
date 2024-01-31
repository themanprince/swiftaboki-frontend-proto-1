import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Landing from "./screens/Landing";
import Login from './screens/Login';
import Send from './screens/Send';
import HandleOrder from "./screens/HandleOrder";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<>
		<Router>
			<Routes>
				<Route path="/" Component={Landing} />
				<Route exact path="/login" Component={Login} />
				<Route exact path="/send" Component={Send} />
				<Route exact path="/handleorder" Component={HandleOrder} />
			</Routes>
		</Router>
	</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
