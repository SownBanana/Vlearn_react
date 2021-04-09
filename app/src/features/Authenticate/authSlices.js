import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthAPI from "../../commons/api/AuthAPI";
import { enqueueSnackbar } from "../Toast/toastSlices";

export const logout = () => (dispatch) => {
	try {
		AuthAPI.logout();
		dispatch(authFail());
	} catch (e) {
		console.log(e);
	}
};

export const register = createAsyncThunk("auth/register", async (params) => {
	try {
		return await AuthAPI.register(params);
	} catch (e) {
		console.log(e);
	}
});
export const login = createAsyncThunk("auth/login", async (params) => {
	try {
		return await AuthAPI.login(params);
	} catch (e) {
		console.log(e);
	}
});
export const createSocial = createAsyncThunk(
	"auth/createSocial",
	async (params) => {
		try {
			return await AuthAPI.createSocial(params);
		} catch (e) {
			console.log(e);
		}
	}
);

export const accessTokenExpired = (refresh_token = null) =>
	async function getNewToken(dispatch) {
		console.log("getting new token");
		console.log(refresh_token);
		try {
			const data = await AuthAPI.refreshToken(refresh_token);
			if (data.status === "success") dispatch(authSuccess(data));
			else dispatch(authFail());
		} catch (e) {
			console.log(e);
		}
	};

export const resendVerify = (email) =>
	async function resendEmail(dispatch) {
		console.log(email);
		try {
			const data = await AuthAPI.resendEmail(email);
			const key = new Date().getTime() + Math.random();
			dispatch(
				enqueueSnackbar({
					key: key,
					message: data.mss,
					options: {
						key: key,
						// preventDuplicate: true,
						variant: data.status === "success" ? "success" : "error",
						autoHideDuration: 2000,
						anchorOrigin: {
							vertical: "bottom",
							horizontal: "left",
						},
					},
				})
			);
		} catch (e) {
			console.log(e);
		}
	};

export const checkPassport = () => async (dispatch) => {
	console.log("checking passport");
	const data = await AuthAPI.checkPassport();
	const key = new Date().getTime() + Math.random();
	dispatch(
		enqueueSnackbar({
			key: key,
			message: "success" in data ? "Authenticated" : "Unauthenticated",
			options: {
				key: key,
				// preventDuplicate: true,
				variant: "success" in data ? "success" : "error",
				autoHideDuration: 2000,
				anchorOrigin: {
					vertical: "bottom",
					horizontal: "left",
				},
			},
		})
	);
};

function clearError(state) {
	state.error.wrongLogin = false;
	state.error.wrongPass = false;
	state.error.notConfirm = "";
	state.error.usedUsername = false;
	state.error.usedEmail = false;
	state.error.serverError = false;
}

function setFail(state) {
	state.isLoggedIn = false;
	state.access_token = null;
	state.refresh_token = null;
	state.expires_on = 0;
	state.tryEffort = state.tryEffort + 1;
	state.user.name = null;
	state.user.username = null;
	state.user.email = null;
	state.user.avatar_url = null;
	state.user.role = null;
	clearError(state);
}
function setSuccess(
	state,
	{ access_token, expires_on, expires_in, user = false }
) {
	state.access_token = access_token;
	// state.refresh_token = refresh_token;
	state.expires_on = expires_on
		? expires_on
		: Math.floor(Date.now() / 1000) + expires_in - 10;
	// : Math.floor(Date.now() / 1000) + 10;
	state.isLoggedIn = true;
	state.tryEffort = 0;
	if (user) {
		state.user.name = user.name;
		state.user.username = user.username;
		state.user.email = user.email;
		state.user.avatar_url = user.avatar_url;
		state.user.role = user.role;
	}
	clearError(state);
}

const initialState = {
	access_token: null,
	refresh_token: null,
	expires_on: 0,
	isLoggedIn: false,
	tryEffort: 0,
	error: {
		wrongLogin: false,
		wrongPass: false,
		notConfirm: "",
		usedUsername: false,
		usedEmail: false,
		serverError: false,
	},
	user: {
		name: null,
		username: null,
		email: null,
		avatar_url: null,
		role: null,
	},
};

const auth = createSlice({
	name: "auth",
	initialState,
	reducers: {
		authSuccess: (state, action) => {
			setSuccess(state, action.payload);
			localStorage.setItem("auth", JSON.stringify({ ...state, error: null }));
		},
		authFail: (state) => {
			setFail(state);
			localStorage.setItem("auth", JSON.stringify({ ...state, error: null }));
		},
		setServerError: (state, status) => {
			state.error.serverError = status;
		},
	},
	extraReducers: {
		[login.fulfilled]: (state, action) => {
			// console.log("==========>", action);
			if (action.payload === undefined || action.payload === null) {
				state.error.serverError = true;
				return;
			}
			if (action.payload.status === "success") {
				setSuccess(state, action.payload);
			} else if (action.payload.status === "notConfirm") {
				setFail(state);
				state.error.notConfirm = action.payload.email;
			} else {
				setFail(state);
				if (action.payload.type === "login") {
					state.error.wrongLogin = true;
				} else {
					state.error.wrongPass = true;
				}
			}
			localStorage.setItem("auth", JSON.stringify({ ...state, error: null }));
		},
		[createSocial.fulfilled]: (state, action) => {
			setSuccess(state, action.payload);
			localStorage.setItem("auth", JSON.stringify({ ...state, error: null }));
		},
	},
});

export const { authSuccess, authFail } = auth.actions;

export default auth.reducer;