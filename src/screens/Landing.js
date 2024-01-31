import Login from "./Login";
import HandleOrder from "./HandleOrder";
import React, {useEffect} from "react";
import {storage} from "../constants.js";

export default function Landing() {
	//I made this mofo cus transak always redirect back to "/",
	//so I wanted to add a way to handle the kini here... as well as also handle login
	
	const isLoggedIn = (window[storage].getItem("userDetails") !== null);
	
	useEffect(() => {
	
		return function() {
			//so user must login again next time this component mounts
			window[storage].clear();
		};
	}, []);
	
	return (
		<>
		{(isLoggedIn) ? <HandleOrder/> : <Login/>}
		</>
	);
	
}