import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/course/resource";
import apiLesson from "commons/api/course/lesson";

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
    question: {

    }

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
        }
    },
});

export const {
    clearCourse,
    setCourse,
    setStatus,
    setLesson
} = learnCourse.actions;
export default learnCourse.reducer;
