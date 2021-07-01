import { createSlice } from "@reduxjs/toolkit";
import rmsApi from "commons/api/recommendation";

export const fetchRecommendCourses = (id) => async (dispatch) => {
    dispatch(setRecommendStatus("loading"));
    const response = await rmsApi.get(id);
    if (response.status === "success") {
        dispatch(setRecommendCourses(response.data));
        dispatch(setRecommendStatus("success"));
    } else {
        dispatch(setRecommendStatus("fail"));
    }
};
export const fetchRecentCourses = () => async (dispatch) => {
    dispatch(setRecentStatus("loading"));
    const response = await rmsApi.getRecent();
    if (response.status === "success") {
        dispatch(setRecentCourses(response.data));
        dispatch(setRecentStatus("success"));
    } else {
        dispatch(setRecentStatus("fail"));
    }
};


const initialState = {
    recommendStatus: "waiting",
    recommendCourses: [],
    recentStatus: "waiting",
    recentCourses: [],
    data: {
        total: null,
        per_page: null,
        last_page: null,
        current_page: null,
        filter: {
            instructor_id: null,
            status: null,
        },
        data: [],
        previousCourses: [],
        nextCourses: [],
    },
};

const home = createSlice({
    name: "home",
    initialState,
    reducers: {
        setRecommendCourses: (state, action) => {
            state.recommendCourses = action.payload;
        },
        setRecentCourses: (state, action) => {
            state.recentCourses = action.payload;
        },
        setCourses: (state, action) => {
            state.data = action.payload;
        },
        setRecommendStatus: (state, action) => {
            state.recommendStatus = action.payload;
        },
        setRecentStatus: (state, action) => {
            state.recentStatus = action.payload;
        }
    },
});

export const {
    setRecommendCourses,
    setRecentCourses,
    setCourses,
    setRecommendStatus,
    setRecentStatus
} = home.actions;
export default home.reducer;
