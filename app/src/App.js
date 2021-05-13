import "./assets/styles/App.scss";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
// useHistory, useLocation
import { PrivateRoute } from "./commons/routes/CustomRoute";
import Home from "./features/Home";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	authSuccess,
	checkPassport,
} from "./features/Authenticate/authSlices";
// import Toast from "./features/Toast";
import Notifier from "./Notifier";
import { ProgressBarProvider as ProgressBar } from "react-redux-progress";
import { CssBaseline, Hidden, ThemeProvider } from "@material-ui/core";
import AppFrame from "./features/Layout/components/AppFrame";
import { enqueueSnackbar } from "./features/Toast/toastSlices";
import ChatComponent from "./features/Chat/components/ChatComponent";
import theme from "./theme/theme";
import Prism from "prismjs";
// import "prismjs/themes/prism.css";
import "prismjs/themes/prism-okaidia.css";
import globalStyle from "style/GlobalStyles";

const Authenticate = React.lazy(() => import("./features/Authenticate/"));
const Course = React.lazy(() => import("./features/Course/"));
const Chat = React.lazy(() => import("./features/Chat/"));
const Info = React.lazy(() => import("./features/Info/"));

function App() {
	const dispatch = useDispatch();
	const serverError = useSelector((state) => state.auth.error.serverError);
	globalStyle();
	const isProgressActive = useSelector(
		(state) => state.common.isActiveProgress
	);
	if (
		localStorage.getItem("auth") &&
		JSON.parse(localStorage.getItem("auth")).isLoggedIn
	) {
		dispatch(authSuccess(JSON.parse(localStorage.getItem("auth"))));
		dispatch(checkPassport());
	}

	// Prism treat <br/> as new line
	useEffect(() => {
		Prism.hooks.add("before-highlight", function (env) {
			env.code = env.element.innerText;
		});
	});
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
			<ThemeProvider theme={theme}>
				{/* <Toast /> */}
				<CssBaseline />
				<ProgressBar isActive={isProgressActive} />
				<Notifier />
				<AppFrame />
				<Suspense fallback={<div>Loading ...</div>}>
					<Switch>
						<Route path="/courses" component={Course} />
						<Route path="/auth" component={Authenticate} />
						<Route path="/message" component={Chat} />
						<Route path="/info" component={Info} />
						<PrivateRoute exact path="/" component={Home} />
					</Switch>
				</Suspense>
				<Hidden xsDown>
					<ChatComponent />
				</Hidden>
			</ThemeProvider>
		</div>
	);
}

export default App;
