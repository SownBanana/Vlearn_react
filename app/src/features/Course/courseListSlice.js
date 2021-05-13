import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/course/resource";

export const fetchCourses = (params) => async (dispatch) => {
	dispatch(setStatus("loading"));
	const response = await api.index({
		...params,
		columns: "*",
	});
	console.log("+=======> ", response);
	if (response.status === "success") {
		console.log("Success");
		dispatch(setCourses(response.data));
		dispatch(setStatus("success"));
	} else {
		console.log("Fail");
		dispatch(setStatus("fail"));
	}
};

const initialState = {
	status: "waiting",
	data: {
		total: null,
		per_page: null,
		last_page: null,
		current_page: null,
		filter: {
			instructor_id: null,
			status: null,
		},
		data: [],
		previousCourses: [],
		nextCourses: [],
	},
};

const courseList = createSlice({
	name: "courseList",
	initialState,
	reducers: {
		setCourses: (state, action) => {
			state.data = action.payload;
		},
		setNextCourses: (state, action) => {
			state.data.nextCourses = action.payload.data;
		},
		setPreviousCourses: (state, action) => {
			state.data.nextCourses = action.payload.data;
		},
		setStatus: (state, action) => {
			state.status = action.payload;
		},
	},
});

export const {
	setCourses,
	setStatus,
	setNextCourses,
	setPreviousCourses,
} = courseList.actions;
export default courseList.reducer;
