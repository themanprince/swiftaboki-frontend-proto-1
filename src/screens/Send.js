import React, {useState} from "react";
import {Transak} from '@transak/transak-sdk';
import {storage} from "../constants.js";

async function handleMoneySending(receiverEmail, amountToSend, setErrorMsg, senderDetails) {
	//gon try to obtain receiverdetails
	const url = `http://localhost:8000/user/${receiverEmail}`;
	const response = await fetch(new Request(url, {
		"method": "GET"
	}));
	
	switch(response.status) {
		case 404:
			setErrorMsg("user dont exist. check email entered");
			break;
		case 200:
			console.log("senderDetails is", senderDetails);
			const receiverDetails = await response.json();
			
			console.log("receiverDetails is", receiverDetails);
			
			const transakConfig = {
			  apiKey: '706c9f48-31b2-4617-bca6-f42824701f2d', // (Required)
			  environment: 'STAGING',
			  walletAddress: receiverDetails.ethaddr,
			  exchangeScreenTitle: "Send Money",
			  productsAvailed: "BUY",
			  fiatAmount: amountToSend,
			  fiatCurrency: senderDetails.fiatCurrency,
			  network: "ethereum",
			  paymentMethod: senderDetails.paymentMethod,
			  cryptoCurrencyCode: "USDT",
			  isFeeCalculationHidden: true,
			  email: senderDetails.email,
			  userData: senderDetails.userData,
			  partnerOrderId: "testid"
			};
		
			//gon first onramp some crypto fron sender bank into receiver  crypto addr
			let transak = new Transak(transakConfig);
			
			console.log('transak object is', transak);
			
			transak.init();
			
			// To get all the events
			Transak.on(Transak.ALL_EVENTS, (data) => {
			  console.log(data);
			});
			
			// This will trigger when the user closed the widget
			Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, (orderData) => {
			  transak.close();
			});
			
			// This will trigger when the user marks payment is made
			/*Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
			  console.log("order successful");
			  console.log(orderData);
			  transak.close();
			});*/

			break;
		default:
			throw new RangeError("I nur sabi this one ohh")
	}
}

export default function Send() {
	
	let [receiverEmail, setReceiverEmail] = useState("");
	let [amountToSend, setAmountToSend] = useState("");
	let [errorMsg, setErrorMsg] = useState("");
	
	const senderDetails = JSON.parse(window[storage].getItem("userDetails"));
	
	return (
		<>
			Receiver Email: <input type="email" prompt="(Enter email of receiver)" value={receiverEmail} onChange={(e) => setReceiverEmail(e.target.value)} /><br/>
			Amount to Send ({senderDetails.fiatCurrency}):  <input type="number" prompt="(Enter amount to send)" value={amountToSend} onChange={(e) => setAmountToSend(e.target.value)}/><br/>
			<button onClick={e => handleMoneySending(receiverEmail, amountToSend, setErrorMsg, senderDetails)}>Send</button><br/>
			<span>{errorMsg}</span>
		</>
	);
}