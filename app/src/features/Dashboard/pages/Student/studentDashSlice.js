import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/schedule";

export const fetchSchedules = () => async (dispatch) => {
    try {
        const response = await api.fetch();
        if (response.status === "success") {
            dispatch(setData(response));
        }
    } catch (e) {
        console.log("Fail", e);
    }
};

export const fetchBoughtCourses = () => async (dispatch, getState) => {
    const { page } = getState().dashStudent.coursesData;
    try {
        const response = await api.fetchBoughtCourses(page + 1);
        if (response.status === "success") {
            dispatch(setCourses(response.data));
        }
    } catch (e) {
        console.log("Fail", e)
    }
}

const initialState = {
    schedules: [],
    courseResources: [],
    sectionResources: [],
    coursesData: {
        data: []
    }
};

const student = createSlice({
    name: "dashStudent",
    initialState,
    reducers: {
        setSchedules: (state, action) => {
            state.schedules = action.payload;
        },
        setResources: (state, action) => {
            state.courseResources = action.payload.courseResources;
            state.sectionResources = action.payload.sectionResources;
        },
        setData: (state, action) => {
            state.schedules = action.payload.schedules;
            state.courseResources = action.payload.courseResources;
            state.sectionResources = action.payload.sectionResources;
        },
        setCourses: (state, action) => {
            state.coursesData.data.push(...action.payload.data);
            state.coursesData.page = action.payload.current_page;
        },
        clearBoughtCourses: (state) => {
            state.coursesData = { data: [] }
        }
    },
});

export const {
    setSchedules,
    setResources,
    setData,
    setCourses,
    clearBoughtCourses
} = student.actions;
export default student.reducer;
