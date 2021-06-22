import "./assets/styles/App.scss";
import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
// useHistory, useLocation
import { PrivateRoute } from "./commons/routes/CustomRoute";
import Home from "./features/Home";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import MomentUtils from '@date-io/moment';
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
import WebSocket from 'commons/components/WebSocket'
import { fetch as fetchTopics } from 'features/Topic/topicSlice'
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const Authenticate = React.lazy(() => import("./features/Authenticate/"));
const Course = React.lazy(() => import("./features/Course/"));
const Chat = React.lazy(() => import("./features/Chat/"));
const Info = React.lazy(() => import("./features/Info/"));
const Dashboard = React.lazy(() => import("./features/Dashboard/"));
const User = React.lazy(() => import("./features/User/"));

function App() {
	globalStyle();
	const dispatch = useDispatch();
	const serverError = useSelector((state) => state.auth.error.serverError);
	const isProgressActive = useSelector(
		(state) => state.common.isActiveProgress
	);
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	const { pathname } = useLocation();
	const root = pathname.split("/");

	useEffect(() => {
		if (root.length === 2 && root[1] === "courses") {
			document.getElementsByClassName('App')[0].style.backgroundImage = 'url("/bg-pattern.jpg")';
		} else {
			document.getElementsByClassName('App')[0].style.backgroundImage = ""
		}
	}, [root]);
	// Prism treat <br/> as new line
	useEffect(() => {
		if (
			localStorage.getItem("auth") &&
			JSON.parse(localStorage.getItem("auth")).isLoggedIn
		) {
			dispatch(authSuccess(JSON.parse(localStorage.getItem("auth"))));
			console.log("Checkpassport from App")
			dispatch(checkPassport());
		}
		Prism.hooks.add("before-highlight", function (env) {
			env.code = env.element.innerText;
		});
		dispatch(fetchTopics());
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
			<ThemeProvider theme={theme}>
				<MuiPickersUtilsProvider utils={MomentUtils}>

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
							<Route path="/dashboard" component={Dashboard} />
							<Route path="/users" component={User} />
							<Route path="/" component={Home} />
						</Switch>
					</Suspense>
					<Hidden xsDown>
						{isLoggedIn && <ChatComponent />}
					</Hidden>
					{isLoggedIn && <WebSocket />}
				</MuiPickersUtilsProvider>
			</ThemeProvider>
		</div>
	);
}

export default App;
