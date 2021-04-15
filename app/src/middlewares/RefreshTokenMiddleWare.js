import { accessTokenExpired } from "../features/Authenticate/authSlices";

const whiteList = ["getNewToken", "actionCreator", "resendEmail"];
const RefreshTokenMiddleWare = (store) => (next) => (action) => {
	if (typeof action === "function" && !whiteList.includes(action.name)) {
		const { dispatch } = store;
		const state = store.getState();
		const { isLoggedIn, expires_on } = state.auth;
		console.log(
			Math.floor(Date.now() / 1000),
			expires_on,
			"isLoggin:",
			isLoggedIn,
			"time out:",
			Math.floor(Date.now() / 1000) >= expires_on
		);
		if (isLoggedIn && Math.floor(Date.now() / 1000) > expires_on) {
			dispatch(accessTokenExpired(next, action));
			return;
		}
	}
	return next(action);
};

export default RefreshTokenMiddleWare;
