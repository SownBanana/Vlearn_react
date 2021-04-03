import "./assets/styles/App.scss";
import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./commons/PrivateRoute";
import Home from "./features/Home";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSuccess } from "./features/Authenticate/authSlices";
// import Toast from "./features/Toast";
import Notifier from "./Notifier";
import { ProgressBarProvider as ProgressBar } from "react-redux-progress";
import { CssBaseline } from "@material-ui/core";
import SideBar from './features/Layout/components/SideBar'

const Authenticate = React.lazy(() => import("./features/Authenticate/"));

function App() {
	const dispatch = useDispatch();
	if (
		localStorage.getItem("auth") &&
		JSON.parse(localStorage.getItem("auth")).isLoggedIn
	)
		dispatch(authSuccess(JSON.parse(localStorage.getItem("auth"))));
	const isProgressActive = useSelector(
		(state) => state.common.isActiveProgress
	);
	return (
		<div className="App">
			{/* <Toast /> */}
			<CssBaseline />
			<ProgressBar isActive={isProgressActive} />
			<Notifier />
			<SideBar/>
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
