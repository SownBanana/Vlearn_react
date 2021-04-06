import "./assets/styles/App.scss";
import React, { useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import PrivateRoute from "./commons/PrivateRoute";
import Home from "./features/Home";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSuccess } from "./features/Authenticate/authSlices";
// import Toast from "./features/Toast";
import Notifier from "./Notifier";
import { ProgressBarProvider as ProgressBar } from "react-redux-progress";
import { CssBaseline } from "@material-ui/core";
import AppFrame from "./features/Layout/components/AppFrame";
import { enqueueSnackbar } from "./features/Toast/toastSlices";

const Authenticate = React.lazy(() => import("./features/Authenticate/"));

function App() {
	const dispatch = useDispatch();
	const serverError = useSelector((state) => state.auth.error.serverError);

	const isProgressActive = useSelector(
		(state) => state.common.isActiveProgress
	);
	useEffect(() => {
		if (
			localStorage.getItem("auth") &&
			JSON.parse(localStorage.getItem("auth")).isLoggedIn
		)
			dispatch(authSuccess(JSON.parse(localStorage.getItem("auth"))));
	}, []);

	useEffect(() => {
		if (serverError) {
			const key = new Date().getTime() + Math.random();
			dispatch(
				enqueueSnackbar({
					key: key,
					message: "Lỗi Server",
					options: {
						key: key,
						preventDuplicate: true,
						variant: "error",
						autoHideDuration: 2000,
						anchorOrigin: {
							vertical: "bottom",
							horizontal: "center",
						},
					},
				})
			);
		}
	}, [serverError, isProgressActive, dispatch]);

	return (
		<div className="App">
			{/* <Toast /> */}
			<CssBaseline />
			<ProgressBar isActive={isProgressActive} />
			<Notifier />
			<AppFrame />
			<Suspense fallback={<div>Loading ...</div>}>
				<Switch>
					<Route path="/auth" component={Authenticate} />
					<PrivateRoute exact path="/" component={Home} />
				</Switch>
			</Suspense>
		</div>
	);
}

export default App;
