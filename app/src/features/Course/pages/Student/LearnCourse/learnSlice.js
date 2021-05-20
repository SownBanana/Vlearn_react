import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/course/resource";
import apiLesson from "commons/api/course/lesson";
import apiQuestion from "commons/api/course/question";
import { LESSON, LIVE_LESSON, QUESTION } from "commons/enums/LearnView";
import shuffle from "commons/shuffer";

export const fetchCourseSummary = (id) => async (dispatch) => {
    try {
        const response = await api.get(id);
        if (response.status === "success") {
            console.log("get course ", response);
            dispatch(setCourse(response));
            if (response.lessonCheckpoint) {
                dispatch(getLesson(response.lessonCheckpoint));
            }
            else {
                dispatch(getLesson(response.data.sections[0].lessons[0].id));
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
export const getQuestions = (section_id) => async (dispatch) => {
    try {
        const response = await apiQuestion.getInSection(section_id);
        if (response.status === "success") {
            dispatch(setQuestions(response.data));
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

function clear(state) {
    state.course = {
        id: null,
        title: "",
        introduce: "",
        price: "",
        sections: [],
    };
    state.status = "";
    state.lesson = {};

}
const initialState = {
    status: "",
    course: {
        id: null,
        title: "",
        introduce: "",
        thumbnail_url: "",
        price: "",
        sections: [],
    },
    lesson: {
    },
    liveLesson: {
    },
    questions: [],
    question: {},
    currentQuestionIndex: -1,
    learnView: LESSON,
    result: {}
};

const learnCourse = createSlice({
    name: "course",
    initialState,
    reducers: {
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
            state.questions = shuffle(action.payload);
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
    setResult
} = learnCourse.actions;
export default learnCourse.reducer;
