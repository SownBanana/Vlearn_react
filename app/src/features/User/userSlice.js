import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/user";

export const fetch = () => async (dispatch) => {
    try {
        const response = await api.fetch();
        console.log("+=======> ", response);
        if (response.status === "success") {
            dispatch(setUsers(response.data));
        }
    } catch (e) {
        console.log("Fail", e);
    }
};

const initialState = {
    users: []
};

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const {
    setUsers,
} = user.actions;
export default user.reducer;
