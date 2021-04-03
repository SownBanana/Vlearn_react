import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAPI from "../../commons/api/AuthAPI";

const initialState = {
	googleLoginLink: "",
};

export const fetchGoogleLink = createAsyncThunk(
	"externalLink/fetchLink",
	async (param) => {
		try {
			return await authAPI.getSocialURL("google");
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
	},
});

export default externalLink.reducer;
