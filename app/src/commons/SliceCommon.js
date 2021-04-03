import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	previousURL: "/",
	currentURL: "/",
	isActiveProgress: false,
};

const common = createSlice({
	name: "common",
	initialState,
	reducers: {
		setPreviousURL: (state, action) => {
			state.previousURL = action.payload;
		},
		setCurrentURL: (state, action) => {
			state.currentURL = action.payload;
		},
		activeProgress: (state) => {
			state.isActiveProgress = true;
		},
		deactiveProgress: (state) => {
			state.isActiveProgress = false;
		},
	},
});

export const {
	setPreviousURL,
	setCurrentURL,
	activeProgress,
	deactiveProgress,
} = common.actions;

export default common.reducer;
