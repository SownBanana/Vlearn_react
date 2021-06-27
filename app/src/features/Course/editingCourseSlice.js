import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/course/resource";
import uploadApi from "commons/api/upload/upload";
import { closeSnackbar, makePersistToast, makeToast, ToastType } from "features/Toast/toastSlices";

var waitTypeTimeout = 0;
export const setCourse = () => async (dispatch, getState) => {
	// dispatch(setStateCourse(params.course));
	dispatch(setStatus("saving"));
	const { course, deleteSections, deleteLessons, deleteQuestions, deleteAnswers, deleteLiveLessons } = getState().editingCourse;
	try {
		clearTimeout(waitTypeTimeout);
		waitTypeTimeout = setTimeout(async () => {
			const response = await api.store({
				course,
				deleteSections,
				deleteLessons,
				deleteQuestions,
				deleteAnswers,
				deleteLiveLessons
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
		dispatch(setStatus("failed"));
	}
};
export const setCourseStatus = (course_id, status) => async (dispatch) => {
	dispatch(setStatus("saving"));
	try {
		const response = await api.setStatus({ course_id, status });
		console.log("+=======> ", response);
		if (response.status === "success") {
			dispatch(setStatus("saved"));
			dispatch(setStateCourseStatus(response.course_status));
		} else {
			console.log(response);
			dispatch(setStatus("failed"));
		}
	} catch (e) {
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
		dispatch(setStatus("fetchFailed"));
	}
};
export const attachTopic = (params) => async (dispatch) => {
	try {
		dispatch(setStatus("fetching"));
		const response = await api.attachTopic(params);
		console.log("+=======> ", response);
		if (response.status === "success") {
			dispatch(setStatus("fetched"));
			dispatch(setStateCourse(response.data));
		} else {
			dispatch(setStatus("fetchFailed"));
		}
	} catch (e) {
		dispatch(setStatus("fetchFailed"));
	}
};
export const detachTopic = (params) => async (dispatch) => {
	try {
		dispatch(setStatus("fetching"));
		const response = await api.detachTopic(params);
		console.log("+=======> ", response);
		if (response.status === "success") {
			dispatch(setStatus("fetched"));
			dispatch(setStateCourse(response.data));
		} else {
			dispatch(setStatus("fetchFailed"));
		}
	} catch (e) {
		dispatch(setStatus("fetchFailed"));
	}
};
export const uploadVideo = (section_id, lesson_id, file) => async (dispatch) => {
	const uploadKey = new Date().getTime() + Math.random();
	try {
		dispatch(setStatus("fetching"));
		dispatch(makePersistToast("Đang tải lên video", ToastType.INFO, uploadKey));
		console.log("Getting presigned url ...");
		const response = await uploadApi.getPresignedUrl({ file: file });
		if (response.status === true) {
			console.log("getting presigned url OK");
			const { url, presigned_url } = response;
			console.log(url, presigned_url);
			console.log("Putting file to s3 ...");
			dispatch(setVideoLesson({ section_id, lesson_id, video_url: url }));
			const resp_status = await uploadApi.uploadPresigned({ presigned_url, file });
			console.log("Putting file done: ", resp_status, url);
			if (resp_status === 200) {
				dispatch(setStatus("fetched"));
				dispatch(makeToast("Tải lên video thành công", ToastType.SUCCESS, true, 3000))
			} else {
				dispatch(setStatus("fetchFailed"));
				dispatch(makeToast("Có lỗi xảy ra khi tải video", ToastType.ERROR, true, 3000))
			}
		} else {
			dispatch(setStatus("fetchFailed"));
			dispatch(makeToast("Có lỗi xảy ra khi tải video", ToastType.ERROR, true, 3000))
		}
		dispatch(closeSnackbar(uploadKey));
	} catch (e) {
		dispatch(setStatus("fetchFailed"));
		dispatch(closeSnackbar(uploadKey));
		dispatch(makeToast("Có lỗi xảy ra khi tải video", ToastType.ERROR, true, 3000))
	}
};

function clearCourse(state) {
	state.course = {
		id: null,
		title: "",
		introduce: "",
		price: "",
		sections: [],
		type: 2,
	};
	state.status = "";
	state.uploadStatus = "";
	state.deleteSections = [];
	state.deleteLessons = [];
	state.deleteQuestions = [];
	state.deleteLiveLessons = [];
	state.deleteAnswers = [];
	state.lessonMode = false;
}
const initialState = {
	status: "",
	uploadStatus: "",
	deleteSections: [],
	deleteLessons: [],
	deleteQuestions: [],
	deleteLiveLessons: [],
	deleteAnswers: [],
	course: {
		id: null,
		title: "",
		introduce: "",
		thumbnail_url: "",
		price: "",
		sections: [],
		type: 2,
	},
	contentEditMode: false,
	isLiveLesson: false,
};

const editingCourse = createSlice({
	name: "editingCourse",
	initialState,
	reducers: {
		setCourseTitle: (state, action) => {
			state.course.title = action.payload;
		},
		setCourseType: (state, action) => {
			state.course.type = action.payload;
		},
		setStateCourseStatus: (state, action) => {
			state.course.status = action.payload;
		},
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
		deleteAnswer: (state, action) => {
			state.deleteAnswers.push(action.payload);
		},
		clearDelete: (state) => {
			state.deleteSections = [];
			state.deleteLessons = [];
			state.deleteQuestions = [];
			state.deleteLiveLessons = [];
			state.deleteAnswers = [];
		},
		setContentEditMode: (state, action) => {
			state.contentEditMode = action.payload;
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
									if (fetchQuestion.answers && question.answers)
										for (let ai = 0; ai < question.answers.length; ai++) {
											const answer = question.answers[ai];
											const fetchAnswer = fetchQuestion.answers[ai];
											if (fetchAnswer && answer) {
												answer.id = fetchAnswer.id;
												answer.question_id = fetchAnswer.question_id;
											}
										}
								}
							}
						if (fetchSection.live_lessons)
							for (let lli = 0; lli < section.live_lessons.length; lli++) {
								const live_lesson = section.live_lessons[lli];
								const fetchLiveLesson = fetchSection.live_lessons[lli];
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
	setCourseTitle,
	setCourseType,
	setStateCourseStatus,
	clearEditingCourse,
	setStateCourse,
	setStateSections,
	setStateCourseId,
	setStatus,
	deleteSection,
	deleteLesson,
	deleteQuestion,
	deleteLiveLesson,
	deleteAnswer,
	setVideoLesson,
	setContentEditMode
} = editingCourse.actions;
export default editingCourse.reducer;
