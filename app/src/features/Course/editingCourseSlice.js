import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "commons/api/course/resource";

var waitTypeTimeout = 0;
export const setCourse = (params) => async (dispatch, getState) => {
	dispatch(setStateCourse(params.course));
	dispatch(setStatus("saving"));
	const { deleteSections, deleteLessons } = getState().editingCourse;
	try {
		clearTimeout(waitTypeTimeout);
		waitTypeTimeout = setTimeout(async () => {
			const response = await api.store({
				...params,
				deleteSections,
				deleteLessons,
			});
			console.log("+=======> ", response);
			if (response.status === "success") {
				dispatch(setStatus("saved"));
				dispatch(setStateCourseId(response.course));
			} else {
				console.log(response);
				dispatch(setStatus("failed"));
			}
		}, 1500);
	} catch (e) {
		console.log("Faillllllllllllllllllll", e);
		dispatch(setStatus("failed"));
	}
};
export const fetchCourse = (id) => async (dispatch) => {
	try {
		dispatch(setStatus("fetching"));
		const response = await api.fetch(id);
		console.log("+=======> ", response);
		if (response.status === "success") {
			dispatch(setStatus("fetched"));
			dispatch(setStateCourse(response.data));
		} else {
			dispatch(setStatus("fetchFailed"));
		}
	} catch (e) {
		console.log("Faillllllllllllllllllll", e);
		dispatch(setStatus("fetchFailed"));
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
	state.status = "";
	state.deleteSections = [];
	state.deleteLessons = [];
	state.deleteQuestions = [];
	state.deleteLiveLessons = [];
}
const initialState = {
	status: "",
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
	deleteSections: [],
	deleteLessons: [],
	deleteQuestions: [],
	deleteLiveLessons: [],
};

const editingCourse = createSlice({
	name: "editingCourse",
	initialState,
	reducers: {
		clearEditingCourse: (state) => {
			clearCourse(state);
		},
		setStatus: (state, action) => {
			state.status = action.payload;
		},
		setStateCourse: (state, action) => {
			state.course = action.payload;
			// localStorage.setItem(
			// 	"editingCourse.course",
			// 	JSON.stringify(state.course)
			// );
		},
		deleteSection: (state, action) => {
			state.deleteSections.push(action.payload);
		},
		deleteLesson: (state, action) => {
			state.deleteLessons.push(action.payload);
		},
		deleteQuestion: (state, action) => {
			state.deleteQuestions.push(action.payload);
		},
		deleteLiveLesson: (state, action) => {
			state.deleteLiveLessons.push(action.payload);
		},
		clearDelete: (state) => {
			state.deleteSections = [];
			state.deleteLessons = [];
			state.deleteQuestions = [];
			state.deleteLiveLessons = [];
		},
		setStateCourseId: (state, action) => {
			state.course.id = action.payload.id;
			if (action.payload.sections) {
				for (let index = 0; index < state.course.sections.length; index++) {
					const section = state.course.sections[index];
					const fetchSection = action.payload.sections[index];
					if (fetchSection && section) {
						section.id = fetchSection.id;
						section.course_id = fetchSection.course_id;
						if (fetchSection.lessons)
							for (let li = 0; li < section.lessons.length; li++) {
								const lesson = section.lessons[li];
								const fetchLesson = fetchSection.lessons[li];
								if (fetchLesson && lesson) {
									lesson.id = fetchLesson.id;
									lesson.section_id = fetchLesson.section_id;
								}
							}
						if (fetchSection.questions)
							for (let qi = 0; qi < section.questions.length; qi++) {
								const question = section.questions[qi];
								const fetchQuestion = fetchSection.questions[qi];
								if (fetchQuestion && question) {
									question.id = fetchQuestion.id;
									question.section_id = fetchQuestion.section_id;
								}
							}
						if (fetchSection.liveLessons)
							for (let lli = 0; lli < section.live_lessons.length; lli++) {
								const live_lesson = section.live_lessons[lli];
								const fetchLiveLesson = fetchSection.liveLessons[lli];
								if (fetchLiveLesson && live_lesson) {
									live_lesson.id = fetchLiveLesson.id;
									live_lesson.section_id = fetchLiveLesson.section_id;
								}
							}
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
	setStatus,
	deleteSection,
	deleteLesson,
	deleteQuestion,
	deleteLiveLesson,
} = editingCourse.actions;
export default editingCourse.reducer;
