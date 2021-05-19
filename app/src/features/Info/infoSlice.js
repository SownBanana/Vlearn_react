import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/info";
import { setUser } from 'features/Authenticate/authSlices'

export const fetchMyData = () => async (dispatch) => {
    try {
        const response = await api.fetch();
        console.log("+=======> ", response);
        if (response.status === "success") {
            dispatch(setMyInfo(response.data));
        }
    } catch (e) {
        console.log("Fail", e);
    }
};
export const updateMyData = (params) => async (dispatch) => {
    try {
        const response = await api.update(params);
        console.log("+=======> ", response);
        if (response.status === "success") {
            dispatch(setNewInfo({}));
            console.log(response);
            if (response.user) {
                dispatch(setMyInfo(response.user));
                dispatch(setUser(response.user));
            }
        }
    } catch (e) {
        console.log("Fail", e);
    }
};

const initialState = {
    myInfo: {},
    newInfo: {}
};

const info = createSlice({
    name: "info",
    initialState,
    reducers: {
        setMyInfo: (state, action) => {
            state.myInfo = action.payload;
        },
        setNewInfo: (state, action) => {
            state.newInfo = action.payload;
            state.newInfo.id = state.myInfo.id;
        },
    },
});

export const {
    setMyInfo,
    setNewInfo
} = info.actions;
export default info.reducer;
