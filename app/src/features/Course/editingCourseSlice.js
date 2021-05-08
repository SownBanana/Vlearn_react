import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "commons/api/course/resource";
import uploadApi from "commons/api/upload/upload";

var waitTypeTimeout = 0;
export const setCourse = () => async (dispatch, getState) => {
	// dispatch(setStateCourse(params.course));
	dispatch(setStatus("saving"));
	const { course, deleteSections, deleteLessons } = getState().editingCourse;
	try {
		clearTimeout(waitTypeTimeout);
		waitTypeTimeout = setTimeout(async () => {
			const response = await api.store({
				course,
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
		}, 1000);
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
export const uploadVideo = (section_id, lesson_id, file) => async (dispatch) => {
	try {
		dispatch(setStatus("fetching"));
		// const response = await uploadApi.upload({ file: file });
		console.log("Getting presigned url ...");
		const response = await uploadApi.getPresignedUrl({ file: file });
		if (response.status === true) {
			console.log("getting presigned url OK");
			const { url, presigned_url } = response;
			console.log(url, presigned_url);
			console.log("Putting file to s3 ...");
			const resp_status = await uploadApi.uploadPresigned({ presigned_url, file });
			console.log("Putting file done: ", resp_status, url);
			if (resp_status === 200) {
				const video_url = url;
				dispatch(setVideoLesson({ section_id, lesson_id, video_url }));
				dispatch(setStatus("fetched"));
			} else {
				dispatch(setStatus("fetchFailed"));
			}
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
	state.uploadStatus = "";
	state.deleteSections = [];
	state.deleteLessons = [];
	state.deleteQuestions = [];
	state.deleteLiveLessons = [];
}
const initialState = {
	status: "",
	uploadStatus: "",
	deleteSections: [],
	deleteLessons: [],
	deleteQuestions: [],
	deleteLiveLessons: [],
	course: {
		id: null,
		title: "",
		introduce: "",
		thumbnail_url: "",
		price: "",
		sections: [],
	},

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
		},
		setStateSections: (state, action) => {
			state.course.sections = action.payload;
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
		setVideoLesson: (state, action) => {
			const { section_id, lesson_id, video_url } = action.payload;
			for (const section of state.course.sections) {
				if (section.id === section_id) {
					for (const lesson of section.lessons) {
						if (lesson.id === lesson_id) {
							lesson.video_url = video_url;
							break;
						}
					}
					break;
				}
			}
		}
	},
});

export const {
	clearEditingCourse,
	setStateCourse,
	setStateSections,
	setStateCourseId,
	setStatus,
	deleteSection,
	deleteLesson,
	deleteQuestion,
	deleteLiveLesson,
	setVideoLesson,
} = editingCourse.actions;
export default editingCourse.reducer;
