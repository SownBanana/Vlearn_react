import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAPI from "../../commons/api/AuthAPI";

const initialState = {
	googleLoginLink: "",
	facebookLoginLink: "",
	githubLoginLink: "",
};

export const fetchGoogleLink = createAsyncThunk(
	"externalLink/fetchGoogleLink",
	async (param) => {
		try {
			return await authAPI.getSocialURL("google");
		} catch (e) {
			console.log(e);
		}
	}
);
export const fetchFacebookLink = createAsyncThunk(
	"externalLink/fetchFacebookLink",
	async (param) => {
		try {
			return await authAPI.getSocialURL("facebook");
		} catch (e) {
			console.log(e);
		}
	}
);
export const fetchGithubLink = createAsyncThunk(
	"externalLink/fetchGithubLink",
	async (param) => {
		try {
			return await authAPI.getSocialURL("github");
		} catch (e) {
			console.log(e);
		}
	}
);

const externalLink = createSlice({
	name: "externalLink",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchGoogleLink.fulfilled]: (state, action) => {
			state.googleLoginLink = action.payload.url;
		},
		[fetchFacebookLink.fulfilled]: (state, action) => {
			state.facebookLoginLink = action.payload.url;
		},
		[fetchGithubLink.fulfilled]: (state, action) => {
			state.githubLoginLink = action.payload.url;
		},
	},
});

export default externalLink.reducer;
