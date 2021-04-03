import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	previousURL: "/",
	currentURL: "/",
	isActiveProgress: false,
	activeProgressCount: 0,
};
var timeOut = 0;
export const activeProgressWithTimeOut = (duration = 5000) => (dispatch) => {
	dispatch(activeProgress());
	timeOut = setTimeout(() => {
		dispatch(deactiveProgress());
	}, duration);
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
			state.activeProgressCount += 1;
			state.isActiveProgress = true;
		},
		deactiveProgress: (state) => {
			clearTimeout(timeOut);
			state.activeProgressCount = Math.max(0, state.activeProgressCount - 1);
			if (state.activeProgressCount === 0) state.isActiveProgress = false;
		},
		clearProgress: (state) => {
			clearTimeout(timeOut);
			state.activeProgressCount = 0;
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
