import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "commons/api/course/resource";

var waitTypeTimeout = 0;
export const setCourse = (params) => async (dispatch) => {
	dispatch(setStateCourse(params.course));
	try {
		clearTimeout(waitTypeTimeout);
		waitTypeTimeout = setTimeout(async () => {
			const response = await api.store(params);
			console.log("+=======> ", response);
			if (response.status === "success") {
				console.log("Success");
				dispatch(setStateCourseId(response.course));
			} else {
				console.log("Fail");
			}
		}, 1500);
	} catch (e) {
		console.log(e);
	}
};
export const fetchCourse = (id) => async (dispatch) => {
	try {
		const response = await api.fetch(id);
		console.log("+=======> ", response);
		if (response.status === "success") {
			console.log("Success");
			dispatch(setStateCourse(response.data));
		} else {
			console.log("Fail");
		}
	} catch (e) {
		console.log(e);
	}
};

function clearCourse(state) {
	state.course = {
		id: null,
		title: "",
		introduce: "",
		price: "",
		sections: [],
	};
}
const initialState = {
	course: {
		id: null,
		title: "",
		introduce: "",
		thumbnail_url: "",
		price: "",
		sections: [
			// {
			// 	id: "",
			// 	uuid: "12",
			// 	order: "",
			// 	course_id: "",
			// 	name: "",
			// 	lessons: [
			// 		{
			// 			id: "",
			// 			uuid: "23",
			// 			order: "",
			// 			section_id: "",
			// 			name: "",
			// 			estimate_time: "",
			// 			video_url: "",
			// 			content: "",
			// 		},
			// 		{
			// 			id: "",
			// 			uuid: "233",
			// 			order: "",
			// 			section_id: "",
			// 			name: "",
			// 			estimate_time: "",
			// 			video_url: "",
			// 			content: "",
			// 		},
			// 	],
			// 	live_lessons: [
			// 		{
			// 			id: "",
			// 			uuid: "34",
			// 			order: "",
			// 			section_id: "",
			// 			name: "",
			// 			schedule_time: "",
			// 		},
			// 	],
			// 	questions: [
			// 		{
			// 			id: "",
			// 			uuid: "45",
			// 			order: "",
			// 			section_id: "",
			// 			question: "",
			// 			type: "",
			// 		},
			// 	],
			// },
			// {
			// 	id: "",
			// 	uuid: "128",
			// 	order: "",
			// 	course_id: "",
			// 	name: "",
			// 	lessons: [
			// 		{
			// 			id: "",
			// 			uuid: "23",
			// 			order: "",
			// 			section_id: "",
			// 			name: "",
			// 			estimate_time: "",
			// 			video_url: "",
			// 			content: "",
			// 		},
			// 		{
			// 			id: "",
			// 			uuid: "233",
			// 			order: "",
			// 			section_id: "",
			// 			name: "",
			// 			estimate_time: "",
			// 			video_url: "",
			// 			content: "",
			// 		},
			// 	],
			// 	live_lessons: [
			// 		{
			// 			id: "",
			// 			uuid: "34",
			// 			order: "",
			// 			section_id: "",
			// 			name: "",
			// 			schedule_time: "",
			// 		},
			// 	],
			// 	questions: [
			// 		{
			// 			id: "",
			// 			uuid: "45",
			// 			order: "",
			// 			section_id: "",
			// 			question: "",
			// 			type: "",
			// 		},
			// 	],
			// },
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
		setStateCourse: (state, action) => {
			state.course = action.payload;
			// localStorage.setItem(
			// 	"editingCourse.course",
			// 	JSON.stringify(state.course)
			// );
		},
		setStateCourseId: (state, action) => {
			state.course.id = action.payload.id;
			if (action.payload.sections) {
				for (let index = 0; index < state.course.sections.length; index++) {
					const section = state.course.sections[index];
					const fetchSection = action.payload.sections[index];
					section.id = fetchSection.id;
					section.course_id = fetchSection.course_id;
					if (fetchSection.lessons)
						for (let li = 0; li < section.lessons.length; li++) {
							const lesson = section.lessons[li];
							const fetchLesson = fetchSection.lessons[li];
							lesson.id = fetchLesson.id;
							lesson.section_id = fetchLesson.section_id;
						}
					if (fetchSection.questions)
						for (let qi = 0; qi < section.questions.length; qi++) {
							const question = section.questions[qi];
							const fetchQuestion = fetchSection.questions[qi];
							question.id = fetchQuestion.id;
							question.section_id = fetchQuestion.section_id;
						}
					if (fetchSection.liveLessons)
						for (let lli = 0; lli < section.live_lessons.length; lli++) {
							const live_lesson = section.live_lessons[lli];
							const fetchLiveLesson = fetchSection.liveLessons[lli];
							live_lesson.id = fetchLiveLesson.id;
							live_lesson.section_id = fetchLiveLesson.section_id;
						}
				}
			}
		},
	},
});

export const {
	clearEditingCourse,
	setStateCourse,
	setStateCourseId,
} = editingCourse.actions;
export default editingCourse.reducer;
