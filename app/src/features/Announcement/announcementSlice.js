import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/announcement";

export const fetch = (params) => async (dispatch) => {
    try {
        console.log("+=======> ", params);
        const response = await api.fetch(params);
        console.log("+=======> ", response);
        if (response.status === "success") {
            dispatch(setAnnouncements(response.data.data));
            dispatch(setTotalAnnouncements(response.data.total))
        }
    } catch (e) {
        console.log("Fail", e);
    }
};
export const get = (id) => async (dispatch) => {
    try {
        const response = await api.get(id);
        if (response.status === "success") {
            dispatch(setAnnouncement(response.data));
        }
    } catch (e) {
        console.log("Fail", e);
    }
};
export const store = (params) => async () => {
    try {
        const response = await api.store(params);
        console.log('===', response)
    } catch (e) {
        console.log("Fail", e);
    }
};

const initialState = {
    announcements: [],
    totalAnnouncements: 0,
    announcement: {},
};

const announcement = createSlice({
    name: "announcement",
    initialState,
    reducers: {
        setAnnouncements: (state, action) => {
            state.announcements = action.payload;
        },
        setTotalAnnouncements: (state, action) => {
            state.totalAnnouncements = action.payload;
        },
        setAnnouncement: (state, action) => {
            state.announcement = action.payload
        }
    },
});

export const {
    setAnnouncements,
    setTotalAnnouncements,
    setAnnouncement
} = announcement.actions;
export default announcement.reducer;
