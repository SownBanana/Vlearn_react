import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";

export default function PrivateRoute({ component: Component, ...rest }) {
	// const isAuthed = useSelector((state) => state.auth.access_token);
	const isAuthed = true;
	console.log("Is Auth", isAuthed);
	return (
		<Route
			{...rest}
			exact
			render={(props) =>
				isAuthed ? (
					<Container maxWidth="md">
						<Box mt={8}>
							<div>{React.createElement(Component, props)}</div>
						</Box>
					</Container>
				) : (
					<Redirect
						to={{
							pathname: "/auth/login",
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
}
