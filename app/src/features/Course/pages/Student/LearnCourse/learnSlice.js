import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/course/resource";
import apiLesson from "commons/api/course/lesson";
import apiLiveLesson from "commons/api/course/liveLesson";
import apiQuestion from "commons/api/course/question";
import uploadApi from "commons/api/upload/upload";
import assetApi from "commons/api/asset";
import { LESSON, LIVE_LESSON, QUESTION } from "commons/enums/LearnView";
import shuffle from "commons/functions/shuffer";
import { makeToast, ToastType } from "features/Toast/toastSlices";
import { humanDayDiff } from "commons/functions/humanTimeDuration";
import moment from "moment";
import { CourseType } from "features/Course/constance";

export const fetchCourseSummary = (id) => async (dispatch) => {
    try {
        const response = await api.get(id);
        if (response.status === "success") {
            console.log("get course ", response);
            dispatch(setCourse(response));
            if (response.data.type === CourseType.LIVE) {
                if (response.lessonCheckpoint) {
                    dispatch(getLiveLesson(response.lessonCheckpoint));
                }
                else {
                    dispatch(getLiveLesson(response.data.sections[0].live_lessons[0].id));
                }
            } else {
                if (response.lessonCheckpoint) {
                    dispatch(getLesson(response.lessonCheckpoint));
                }
                else {
                    dispatch(getLesson(response.data.sections[0].lessons[0].id));
                }
            }
        }
    } catch (e) {
        console.log("Faillllllllllllllllllll", e);
    }
};
export const fetchCourse = (id) => async (dispatch) => {
    try {
        const response = await api.fetch(id);
        if (response.status === "success") {
            dispatch(setCourse(response.data));
        }
    } catch (e) {
        console.log("Faillllllllllllllllllll", e);
    }
};
export const getLesson = (id) => async (dispatch) => {
    try {
        const response = await apiLesson.get(id);
        console.log("get lesson ", response);
        if (response.status === "success") {
            dispatch(setLesson(response.data));
        }
    } catch (e) {
        console.log("Faillllllllllllllllllll", e);
    }
};
export const getLiveLesson = (id) => async (dispatch) => {
    try {
        const response = await apiLiveLesson.get(id);
        console.log("get live lesson ", response);
        if (response.status === "success") {
            dispatch(setLiveLesson(response.data));
        }
    } catch (e) {
        console.log("Faillllllllllllllllllll", e);
    }
};
export const getQuestionsStatistic = (section_id) => async (dispatch) => {
    try {
        const response = await apiQuestion.statistic(section_id);
        if (response.status === "success") {
            dispatch(setQuestions(response));
        }
    } catch (e) {
        console.log("Faillllllllllllllllllll", e);
    }
};
export const getQuestions = (section_id) => async (dispatch) => {
    try {
        const response = await apiQuestion.getInSection(section_id);
        if (response.status === "success") {
            dispatch(setQuestions(response));
        } else {
            const { last_test, wait_time, question_step } = response.data;
            dispatch(
                makeToast(
                    `Bạn chưa thể làm bài ngay lúc này, 
                    `, ToastType.WARNING, true, 4000));
            dispatch(
                makeToast(
                    ` Lần cuối bạn làm vào ${moment(Date.parse(last_test)).format('DD-MM-YYYY hh:mm')}, giới hạn làm bài là ${question_step} ngày, 
                        thử lại sau ${humanDayDiff(wait_time)}`, ToastType.INFO, true, 4000));
        }
    } catch (e) {
        console.log("Faillllllllllllllllllll", e);
    }
};
export const calculateAnswers = () => async (dispatch, getState) => {
    try {
        const { questions } = getState().learnCourse;
        const response = await apiQuestion.calculatePoint({ questions });
        console.log(response);
        dispatch(setResult(response));
    } catch (e) {
        console.log("Faillllllllllllllllllll", e);
    }
};

export const getNextSection = (current_section_id) => async (dispatch, getState) => {
    const { course } = getState().learnCourse;
    var notLast = false;
    for (let index = 0; index < course.sections.length - 1; index++) {
        const section = course.sections[index];
        if (section.id === current_section_id) {
            const nextSection = course.sections[index + 1];
            if (nextSection.lessons.length > 0) {
                notLast = true;
                dispatch(getLesson(nextSection.lessons[0].id))
            } else if (nextSection.questions.length > 0) {
                dispatch(getQuestions(nextSection.id));
            } else {
                dispatch(makeToast("Có gì đó không đúng ở đây", ToastType.WARNING))
            }
            break;
        }
    }
    if (!notLast) dispatch(makeToast("Đây là chương cuối cùng", ToastType.INFO))
}
export const deleteResource = ({ id, type, lesson_id }) => async (dispatch) => {
    const res = await assetApi.delete(id);
    if (res.status === "success") {
        if (type === LIVE_LESSON) {
            dispatch(getLiveLesson(lesson_id));
        } else {
            dispatch(getLesson(lesson_id));
        }
    }

}
export const uploadResource = (params) => async (dispatch) => {
    const { files, type, lesson_id } = params;
    var assets = [];
    const TEN_GB = 10737418240;
    if (files.length > 100) {
        dispatch(makeToast("Vượt quá số file cho phép"));
    } else {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(file)
            if (file.size > TEN_GB) {
                dispatch(makeToast("File vượt quá 10GB"));
            } else {
                const response = await uploadApi.uploadDirect({ file: file });
                if (response) {
                    assets = [...assets, response.asset.id];
                }
            }
        }
        const lessonData = await uploadApi.uploadResourceToLesson({
            assets,
            type,
            lesson_id
        })
        if (lessonData.status === "success") {
            if (type === LIVE_LESSON) {
                dispatch(setLiveLesson(lessonData.data));
            } else {
                dispatch(setLesson(lessonData.data));
            }
        } else {
            dispatch(makeToast("Có lỗi xảy ra"));
        }
    }
}

function clear(state) {
    state.course = {
        id: null,
        title: "",
        introduce: "",
        price: "",
        sections: [],
        students: [],
    };
    state.status = "";
    state.lesson = {};
    state.liveLesson = {
    };
    state.questions = [];
    state.question = {};
    state.currentQuestionIndex = -1;
    state.learnView = LESSON;
    state.result = {};
    state.questionSetting = {};

}
function clearQuestion(state) {
    state.questions = [];
    state.question = {};
    state.currentQuestionIndex = -1;
    state.result = {};
    state.questionSetting = {};
}
const initialState = {
    course: {
        id: null,
        title: "",
        introduce: "",
        thumbnail_url: "",
        price: "",
        sections: [],
        students: [],
    },
    lesson: {
    },
    liveLesson: {
    },
    status: "",
    questions: [],
    question: {},
    currentQuestionIndex: -1,
    learnView: LESSON,
    result: {},
    questionSetting: {},
};

const learnCourse = createSlice({
    name: "course",
    initialState,
    reducers: {
        drawAllPermission: (state) => {
            state.course.students = state.course.students.map(student => {
                student.permission = false;
                return student
            })
        },
        setPermission: (state, action) => {
            const { id, permission } = action.payload;
            state.course.students = state.course.students.map(student => {
                if (student.id === id) student.permission = permission;
                return student
            })
        },
        setRaisehand: (state, action) => {
            const { id, raise } = action.payload;
            state.course.students = state.course.students.map(student => {
                if (student.id === id) student.raise = raise;
                return student
            })
        },
        clearCourse: (state) => {
            clear(state);
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setCourse: (state, action) => {
            state.course = action.payload.data;
        },
        setLesson: (state, action) => {
            state.lesson = action.payload;
            state.learnView = LESSON;
            state.question = {};
            state.liveLesson = {};
        },
        setQuestions: (state, action) => {
            const { data, settings } = action.payload;
            clearQuestion(state);
            state.questionSetting = settings;
            state.questions = shuffle(data);
            state.currentQuestionIndex = 0;
            state.question = state.questions[0];
            state.learnView = QUESTION;
            state.lesson = {};
            state.liveLesson = {};
        },
        navQuestion: (state, action) => {
            state.question = state.questions[action.payload];
            state.currentQuestionIndex = action.payload;
            state.learnView = QUESTION;
        },
        checkAnswer: (state, action) => {
            const { index, value } = action.payload;
            state.question.answers[index].is_check = value;
            state.questions[state.currentQuestionIndex] = state.question;
        },
        checkSingleAnswer: (state, action) => {
            state.question.checkSingleAnswer = action.payload;
            state.question.answer_id = state.question.answers[action.payload].id;
            state.questions[state.currentQuestionIndex] = state.question;
        },
        setLiveLesson: (state, action) => {
            state.liveLesson = action.payload;
            state.learnView = LIVE_LESSON;
            state.question = {};
            state.lesson = {};
        },
        setLearnView: (state, action) => {
            state.learnView = action.payload;
        },
        setResult: (state, action) => {
            state.result = action.payload;
        }
    },
});

export const {
    clearCourse,
    setCourse,
    setStatus,
    setLesson,
    setQuestions,
    navQuestion,
    setLiveLesson,
    setLearnView,
    checkAnswer,
    checkSingleAnswer,
    setResult,
    setPermission,
    setRaisehand,
    drawAllPermission
} = learnCourse.actions;
export default learnCourse.reducer;
