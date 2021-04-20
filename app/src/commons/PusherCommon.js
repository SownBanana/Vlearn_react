// eslint-disable-next-line
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const options = (access_token) => {
	return {
		broadcaster: "pusher",
		// key: `${process.env.REACT_APP_PUSHER_APP_KEY}`,
		key: `ced39abfcc1119439466`,
		// cluster: `${process.env.REACT_APP_PUSHER_APP_CLUSTER}`,
		cluster: `ap1`,
		forceTLS: false,
		encrypted: false,
		//authEndpoint is your apiUrl + /broadcasting/auth
		authEndpoint: `${process.env.REACT_APP_BACKEND_URL}/api/broadcasting/auth`,
		// As I'm using JWT tokens, I need to manually set up the headers.
		auth: {
			headers: {
				// "X-CSRF-TOKEN": csrf_token,
				Authorization: "Bearer " + access_token,
				Accept: "application/json",
				// "Content-Type": "application/json",
				"Access-Control-Allow-Origin": `http://localhost:80`,
				"Access-Control-Allow-Credentials": "true",
			},
		},
	};
};

function usePusher(id) {
	const [pusher, setPusher] = useState(null);
	const access_token = useSelector((state) => state.auth.access_token);
	useEffect(() => {
		// console.log("Init pusher:", id, access_token);
		if (id) {
			setPusher(new Echo(options(access_token)));
		}
		// eslint-disable-next-line
	}, [id, access_token]);
	return pusher;
}

export default usePusher;
