import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/notification";

export const NotificationType = {
    RATE_COURSE: "App\\Notifications\\RateCourse",
    BUY_COURSE: "App\\Notifications\\BuyCourse",
}

export const fetchNotifications = () => async (dispatch, getState) => {
    try {
        // debugger
        const { page } = getState().notification;
        const response = await api.fetch(page + 1);
        if (response.status === "success") {
            if (page === 0) dispatch(setUnread(response.unread))
            dispatch(setNotifications(response.data));
        }
    } catch (e) {
        console.log("Fail", e);
    }
};
export const readNotifications = (id) => (dispatch) => {
    try {
        api.read(id);
        dispatch(readState(id));
    } catch (e) {
        console.log("Fail", e);
    }
};

const initialState = {
    notifications: {
        data: []
    },
    page: 0,
    lastPage: 100,
    unread: 0
};

const notification = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.notifications.data.push(...action.payload.data);
            state.page = action.payload.current_page;
            state.lastPage = action.payload.last_page;
        },
        clearNotifications: (state) => {
            state.notifications = {
                data: []
            };
            state.page = 0;
            state.lastPage = 100;
            state.unread = 0;
        },
        readState: (state, action) => {
            const id = action.payload;
            state.notifications.data = state.notifications.data.map(noti => {
                if (noti.id === id) {
                    noti.read_at = true;
                    state.unread -= 1;
                }
                return noti;
            });
        },
        pushNotification: (state, action) => {
            state.notifications.data.unshift(action.payload);
            state.unread += 1;
        },
        setUnread(state, action) {
            state.unread = action.payload || 0;
        }
    },
});

export const {
    setNotifications,
    clearNotifications,
    readState,
    pushNotification,
    setUnread
} = notification.actions;
export default notification.reducer;
