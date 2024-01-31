import React, {useEffect, useState} from "react";
import {storage} from "../constants.js";

async function loginHandler(email, setServerResponse) {
	const SERVER_URL = "http://localhost:8000/login";
	
	const response = await fetch(new Request(SERVER_URL, {
			'headers': {
				'Content-Type': "Application/json"
			},
			'method': "POST",
			"body": JSON.stringify({"email": email})
		}));

	switch(response.status) {
		case 400:
			setServerResponse([400, "Email don't exist or is invalid... check again"]);
			break;
		case 200:
			const body = await response.json();
			//caching uset kini
			window[storage].setItem("userDetails", JSON.stringify(body.user));
			setServerResponse([200, "Login successful!.. REdirecting..."]);
			break;
		default:
			throw new RangeError('I naturally assumed we aint posed to get here')
	}
}

export default function Login() {
	let [email, setEmail] = useState("");
	let [serverResponse, setServerResponse] = useState([]);
	
	//next is something that gon redirect user if and after login successful
	useEffect(() => {
		const /*status*/code = serverResponse[0];

		if(code === 200)
			setTimeout(() => {
				//initialising a redirect
				window.location.replace("/send");
			}, 1000);
		
	}, [serverResponse]);
	
	return (
		<div>
			<input type="email" value={email} onChange={e => setEmail(e.target.value) }/>
			<button onClick={() => loginHandler(email, setServerResponse)}>Login</button>
			<br/><span>{serverResponse[1]}</span>
		</div>
	);
}