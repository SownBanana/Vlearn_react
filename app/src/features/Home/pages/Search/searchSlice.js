import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/search";

export const search = (search) => async (dispatch) => {
    try {
        const response = await api.search(search);
        if (response.status === "success") {
            dispatch(setData(response));
        }
    } catch (e) {
        console.log("Fail", e);
    }
};

const initialState = {
    courses: [],
    instructors: [],
    students: []
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.instructors = action.payload.instructors;
            state.students = action.payload.students;
            state.courses = action.payload.courses;
        },
        setInstructors: (state, action) => {
            state.instructors = action.payload;
        },
        setStudents: (state, action) => {
            state.students = action.payload;
        },
        setCourses: (state, action) => {
            state.courses = action.payload;
        },
    },
});

export const {
    setData,
    setInstructors,
    setStudents,
    setCourses
} = searchSlice.actions;
export default searchSlice.reducer;
