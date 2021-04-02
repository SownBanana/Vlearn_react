import { accessTokenExpired } from "../features/Authenticate/authSlices";
const RefreshTokenMiddleWare = (store) => (next) => (action) => {
	if (
		typeof action === "function" &&
		action.name !== "getNewToken" &&
		action.name !== "actionCreator" &&
		action.name !== "resendEmail"
	) {
		const { dispatch } = store;
		const state = store.getState();
		const { isLoggedIn, expires_on } = state.auth;
		console.log(Math.floor(Date.now() / 1000), expires_on, isLoggedIn);
		if (isLoggedIn && Math.floor(Date.now() / 1000) > expires_on) {
			dispatch(accessTokenExpired());
		}
	}
	return next(action);
};

export default RefreshTokenMiddleWare;
