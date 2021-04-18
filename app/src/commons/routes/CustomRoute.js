import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route as DefaultRoute } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	boundary: {
		marginTop: theme.spacing(7),
		marginLeft: theme.spacing(0),
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(7),
		},
	},
}));

const Route = function ({ component: Component, ...rest }) {
	const classes = useStyles();
	return (
		<DefaultRoute
			{...rest}
			exact
			render={(props) => (
				<Container className={classes.boundary}>
					{React.createElement(Component, props)}
				</Container>
			)}
		/>
	);
};

const PrivateRoute = function ({
	component: Component,
	maxWidth = "md",
	...rest
}) {
	const classes = useStyles();
	const isAuthed = useSelector((state) => state.auth.access_token);
	return (
		<DefaultRoute
			{...rest}
			exact
			render={(props) =>
				isAuthed ? (
					<Container className={classes.boundary}>
						{React.createElement(Component, props)}
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

const StudentRoute = function ({
	component: Component,
	maxWidth = "md",
	...rest
}) {
	const classes = useStyles();
	const isAuthed = useSelector((state) => state.auth.access_token);
	const role = useSelector((state) => state.auth.user.role);
	return (
		<DefaultRoute
			{...rest}
			exact
			render={(props) =>
				isAuthed && role === 3 ? (
					<Container className={classes.boundary}>
						{React.createElement(Component, props)}
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

const InstructorRoute = function ({
	component: Component,
	maxWidth = "md",
	...rest
}) {
	const classes = useStyles();

	const isAuthed = useSelector((state) => state.auth.access_token);
	const role = useSelector((state) => state.auth.user.role);
	return (
		<DefaultRoute
			{...rest}
			exact
			render={(props) =>
				isAuthed && role === 2 ? (
					<Container className={classes.boundary}>
						{React.createElement(Component, props)}
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
