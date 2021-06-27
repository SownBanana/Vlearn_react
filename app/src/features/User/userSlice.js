import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/user";

export const fetch = (params) => async (dispatch) => {
    try {
        const response = await api.fetch(params);
        console.log("+=======> ", response);
        if (response.status === "success") {
            dispatch(setUsers(response.data.data));
            dispatch(setTotalUsers(response.data.total))
        }
    } catch (e) {
        console.log("Fail", e);
    }
};
export const verify = (params) => async () => {
    try {
        await api.verify(params);
    } catch (e) {
        console.log("Fail", e);
    }
};
export const createAdmin = (params) => async () => {
    try {
        await api.createAdmin(params);
    } catch (e) {
        console.log("Fail", e);
    }
};

const initialState = {
    users: [],
    totalUsers: 0,
};

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setTotalUsers: (state, action) => {
            state.totalUsers = action.payload
        }
    },
});

export const {
    setUsers,
    setTotalUsers
} = user.actions;
export default user.reducer;
