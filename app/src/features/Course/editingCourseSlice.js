import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "commons/api/course/resource";

export const storeCourse = (params) => (dispatch) => {
	try {
		const response = api.store(params);
		if (response.data.status === "success") dispatch(clearEditingCourse());
	} catch (e) {
		console.log(e);
	}
};

function clearCourse(state) {
	state.course = {
		id: "",
		title: "",
		introduce: "",
		price: "",
		sections: [
			{
				id: "",
				uuid: "12",
				order: "",
				course_id: "",
				name: "",
				lessons: [
					{
						id: "",
						uuid: "23",
						order: "",
						section_id: "",
						name: "",
						estimate_time: "",
						video_url: "",
						content: "",
					},
					{
						id: "",
						uuid: "233",
						order: "",
						section_id: "",
						name: "",
						estimate_time: "",
						video_url: "",
						content: "",
					},
				],
				live_lessons: [
					{
						id: "",
						uuid: "34",
						order: "",
						section_id: "",
						name: "",
						schedule_time: "",
					},
				],
				questions: [
					{
						id: "",
						uuid: "45",
						order: "",
						section_id: "",
						question: "",
						type: "",
					},
				],
			},
			{
				id: "",
				uuid: "128",
				order: "",
				course_id: "",
				name: "",
				lessons: [
					{
						id: "",
						uuid: "23",
						order: "",
						section_id: "",
						name: "",
						estimate_time: "",
						video_url: "",
						content: "",
					},
					{
						id: "",
						uuid: "233",
						order: "",
						section_id: "",
						name: "",
						estimate_time: "",
						video_url: "",
						content: "",
					},
				],
				live_lessons: [
					{
						id: "",
						uuid: "34",
						order: "",
						section_id: "",
						name: "",
						schedule_time: "",
					},
				],
				questions: [
					{
						id: "",
						uuid: "45",
						order: "",
						section_id: "",
						question: "",
						type: "",
					},
				],
			},
		],
	};
}
const initialState = {
	course: {
		id: "",
		title: "",
		introduce: "",
		price: "",
		sections: [
			{
				id: "",
				uuid: "12",
				order: "",
				course_id: "",
				name: "",
				lessons: [
					{
						id: "",
						uuid: "23",
						order: "",
						section_id: "",
						name: "",
						estimate_time: "",
						video_url: "",
						content: "",
					},
					{
						id: "",
						uuid: "233",
						order: "",
						section_id: "",
						name: "",
						estimate_time: "",
						video_url: "",
						content: "",
					},
				],
				live_lessons: [
					{
						id: "",
						uuid: "34",
						order: "",
						section_id: "",
						name: "",
						schedule_time: "",
					},
				],
				questions: [
					{
						id: "",
						uuid: "45",
						order: "",
						section_id: "",
						question: "",
						type: "",
					},
				],
			},
			{
				id: "",
				uuid: "128",
				order: "",
				course_id: "",
				name: "",
				lessons: [
					{
						id: "",
						uuid: "23",
						order: "",
						section_id: "",
						name: "",
						estimate_time: "",
						video_url: "",
						content: "",
					},
					{
						id: "",
						uuid: "233",
						order: "",
						section_id: "",
						name: "",
						estimate_time: "",
						video_url: "",
						content: "",
					},
				],
				live_lessons: [
					{
						id: "",
						uuid: "34",
						order: "",
						section_id: "",
						name: "",
						schedule_time: "",
					},
				],
				questions: [
					{
						id: "",
						uuid: "45",
						order: "",
						section_id: "",
						question: "",
						type: "",
					},
				],
			},
		],
	},
};

const editingCourse = createSlice({
	name: "editingCourse",
	initialState,
	reducers: {
		clearEditingCourse: (state) => {
			clearCourse(state);
		},
		setCourse: (state, action) => {
			state.course = action.payload;
			localStorage.setItem(
				"editingCourse.course",
				JSON.stringify(state.course)
			);
		},
	},
});

export const { clearEditingCourse, setCourse } = editingCourse.actions;
export default editingCourse.reducer;
