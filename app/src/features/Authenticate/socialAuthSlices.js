import { createSlice } from "@reduxjs/toolkit";
import authAPI from "../../commons/api/AuthAPI";
import { authSuccess } from "./authSlices";
import { deactiveProgress } from "../../commons/SliceCommon";

const initialState = {
	pendingSocial: {},
	social: [],
};
export const getSocialCallback = (params) => async (dispatch) => {
	try {
		console.log(params);
		const data = await authAPI.getSocialCallback(params);
		if (data.status === "success") {
			dispatch(authSuccess(data));
		} else {
			dispatch(setSocialState(data));
		}
	} catch (e) {
		console.log(e);
	} finally {
		dispatch(deactiveProgress());
	}
};

const social = createSlice({
	name: "social",
	initialState,
	reducers: {
		setSocialState: (state, action) => {
			state.pendingSocial = action.payload;
		},
	},
	extraReducers: {},
});

export const { setSocialState } = social.actions;
export default social.reducer;
