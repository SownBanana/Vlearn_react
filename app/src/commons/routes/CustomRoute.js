import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route as DefaultRoute } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
import { UserRole } from "features/Authenticate/constance";
const useStyles = makeStyles((theme) => ({
	boundary: {
		paddingTop: theme.spacing(5),
		paddingLeft: theme.spacing(0),
		paddingRight: theme.spacing(0),
		[theme.breakpoints.up("sm")]: {
			paddingLeft: theme.spacing(7),
			paddingTop: theme.spacing(6),
		},
	},
}));

const Route = function ({ component: Component, maxWidth = false, ...rest }) {
	const classes = useStyles();
	return (
		<DefaultRoute
			{...rest}
			exact
			render={(props) => (
				<Container maxWidth={maxWidth} className={classes.boundary}>
					{React.createElement(Component, props)}
				</Container>
			)}
		/>
	);
};

const PrivateRoute = function ({
	component: Component,
	maxWidth = false,
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
					<Container maxWidth={maxWidth} className={classes.boundary}>
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
	maxWidth = false,
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
				isAuthed && role === UserRole.STUDENT ? (
					<Container maxWidth={maxWidth} className={classes.boundary}>
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
	maxWidth = false,
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
				isAuthed && role === UserRole.INSTRUCTOR ? (
					<Container maxWidth={maxWidth} className={classes.boundary}>
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
