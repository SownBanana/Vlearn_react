import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import usePusher from "../PusherCommon";
export default function ChatComponent() {
	const id = useSelector((state) => state.auth.user.id);
	const pusher = usePusher(id);
	console.log("Pusher: ", pusher);
	if (pusher) console.log("Socket: ", pusher.socketId());
	useEffect(() => {
		console.log("Check login chat for", id);
		if (id && pusher) {
			pusher.leave("App.PrivateMessage." + id);
			console.log("connect chat channel");
			pusher
				.private("App.PrivateMessage." + id)
				.listen(`PrivateMessageSend`, (data) => {
					console.log(pusher.socketId());
					console.log(data);
				});
		}
	}, [pusher, id]);
	return <div>ABC</div>;
}
