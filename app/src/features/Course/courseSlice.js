import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/course/resource";
import { makeToast, ToastType } from "features/Toast/toastSlices";

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
        if (response.status === "success") {
            dispatch(makeToast("Mua khóa học thành công", ToastType.SUCCESS));
            dispatch(setBuyCourse(true));
        } else {
            dispatch(makeToast(response.status, ToastType.INFO));
        }
    } catch (e) {
        dispatch(setStatus("fail"));
        console.log("Faillllllllllllllllllll", e);
    }
};

export const rateCourse = (params) => async (dispatch) => {
    try {
        const response = await api.rate(params);
        console.log("+=======> ", response);
        if (response.status === "success") {
            dispatch(setCourse(response));
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
    state.bought = false;
    state.status = "";
    state.uploadStatus = "";
    state.statistic = [];
}
const initialState = {
    status: "",
    uploadStatus: "",
    bought: false,
    statistic: [],
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
            state.statistic = action.payload.statistic;
        },
        setBuyCourse: (state, action) => {
            state.bought = action.payload;
        }
    },
});

export const {
    clearCourse,
    setCourse,
    setStatus,
    setBuyCourse
} = course.actions;
export default course.reducer;
