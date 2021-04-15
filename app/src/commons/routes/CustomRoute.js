import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route as DefaultRoute } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";

const Route = function ({ component: Component, ...rest }) {
	return (
		<DefaultRoute
			{...rest}
			exact
			render={(props) => (
				<Container maxWidth="md">
					<Box mt={8}>
						<div>{React.createElement(Component, props)}</div>
					</Box>
				</Container>
			)}
		/>
	);
};

const PrivateRoute = function ({ component: Component, ...rest }) {
	const isAuthed = useSelector((state) => state.auth.access_token);
	return (
		<DefaultRoute
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
};

const StudentRoute = function ({ component: Component, ...rest }) {
	const isAuthed = useSelector((state) => state.auth.access_token);
	const role = useSelector((state) => state.auth.user.role);
	return (
		<DefaultRoute
			{...rest}
			exact
			render={(props) =>
				isAuthed && role === 3 ? (
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
};

const InstructorRoute = function ({ component: Component, ...rest }) {
	const isAuthed = useSelector((state) => state.auth.access_token);
	const role = useSelector((state) => state.auth.user.role);
	return (
		<DefaultRoute
			{...rest}
			exact
			render={(props) =>
				isAuthed && role === 2 ? (
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
};

export { Route, PrivateRoute, StudentRoute, InstructorRoute };
