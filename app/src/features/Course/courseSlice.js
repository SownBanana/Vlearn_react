import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/course/resource";

export const fetchCourseSummary = (id) => async (dispatch) => {
    try {
        const response = await api.get(id);
        console.log("+=======> ", response);
        if (response.status === "success") {
            dispatch(setCourse(response));
        }
    } catch (e) {
        console.log("Faillllllllllllllllllll", e);
    }
};
export const fetchCourse = (id) => async (dispatch) => {
    try {
        const response = await api.fetch(id);
        console.log("+=======> ", response);
        if (response.status === "success") {
            dispatch(setCourse(response.data));
        }
    } catch (e) {
        console.log("Faillllllllllllllllllll", e);
    }
};
export const buyCourse = (id) => async (dispatch) => {
    try {
        dispatch(setStatus("pending"));
        const response = await api.buy(id);
        console.log("+=======> ", response);
        dispatch(setStatus(response.status));
    } catch (e) {
        dispatch(setStatus("fail"));
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
    state.bought = false;
    state.status = "";
    state.uploadStatus = "";
}
const initialState = {
    status: "",
    uploadStatus: "",
    bought: false,
    course: {
        id: null,
        title: "",
        introduce: "",
        thumbnail_url: "",
        price: "",
        sections: [],
    },

};

const course = createSlice({
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
            state.bought = action.payload.bought;
        },
    },
});

export const {
    clearCourse,
    setCourse,
    setStatus
} = course.actions;
export default course.reducer;
