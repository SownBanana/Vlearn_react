import { Fab, Hidden, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import usePusher from "../PusherCommon";
import { ModeComment } from "@material-ui/icons";
export default function ChatComponent() {
	const classes = useStyles();
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
	return (
		// <Hidden xsDown>
		<Fab className={classes.chatBubble} color="secondary" aria-label="add">
			<ModeComment />
		</Fab>
		// </Hidden>
	);
}

const useStyles = makeStyles((theme) => ({
	chatBubble: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
}));
