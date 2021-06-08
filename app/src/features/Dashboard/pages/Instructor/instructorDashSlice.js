import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/schedule";

export const fetchSchedules = () => async (dispatch) => {
    try {
        const response = await api.fetch();
        console.log("+=======> ", response);
        if (response.status === "success") {
            dispatch(setData(response));
        }
    } catch (e) {
        console.log("Fail", e);
    }
};

const initialState = {
    schedules: [],
    courseResources: [],
    sectionResources: []
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
        }
    },
});

export const {
    setSchedules,
    setResources,
    setData
} = instructor.actions;
export default instructor.reducer;
