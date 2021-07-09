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

export const fetchBoughtCoursesTimeSeries = () => async (dispatch) => {
    try {
        const response = await api.fetchBoughtCoursesTimeSeries();
        if (response.status === "success") {
            dispatch(setBoughtCourseData(response.data));
        }
    } catch (e) {
        console.log("Fail", e);
    }
};

export const fetchRateTimeSeries = () => async (dispatch) => {
    try {
        const response = await api.fetchRateTimeSeries();
        if (response.status === "success") {
            dispatch(setRateData(response.data));
        }
    } catch (e) {
        console.log("Fail", e);
    }
};

const initialState = {
    schedules: [],
    courseResources: [],
    sectionResources: [],
    boughtCourseData: [],
    rateData: [],
};

const instructor = createSlice({
    name: "dashInstructor",
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
        setBoughtCourseData: (state, action) => {
            state.boughtCourseData = action.payload;
        },
        setRateData: (state, action) => {
            state.rateData = action.payload;
        }
    },
});

export const {
    setSchedules,
    setResources,
    setData,
    setBoughtCourseData,
    setRateData,
} = instructor.actions;
export default instructor.reducer;
