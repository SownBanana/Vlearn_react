import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/search";
import { Statuses } from "commons/enums/status";

export const search = (search) => async (dispatch) => {
    try {
        dispatch(setStatus(Statuses.LOADING));
        const response = await api.search(search);
        if (response.status === "success") {
            dispatch(setStatus(Statuses.SUCCESS));
            dispatch(setData(response));
        }
    } catch (e) {
        dispatch(setStatus(Statuses.FAIL));
        console.log("Fail", e);
    }
};

const initialState = {
    status: Statuses.WAITING,
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
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const {
    setData,
    setInstructors,
    setStudents,
    setCourses,
    setStatus,
} = searchSlice.actions;
export default searchSlice.reducer;
