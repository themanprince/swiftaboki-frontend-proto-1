//after processing, I'mma be given the details of the order so I can monitor it in this route/page
import React, {useEffect} from "react";

export default function HandleOrder() {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const orderId = params.get("orderId");
		
		console.log("search url is", window.location.search);
	}, []);
}