import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/info";
import { setUser } from 'features/Authenticate/authSlices'
import { makeToast, ToastType } from "features/Toast/toastSlices";

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
            if (response.data) {
                dispatch(setMyInfo(response.data));
                dispatch(setUser(response.data));
                dispatch(makeToast("Thông tin đã được cập nhật", ToastType.SUCCESS, true, 1000));
            }
        }
    } catch (e) {
        console.log("Fail", e);
    }
};

export const attachSocial = (params) => async (dispatch) => {
    try {
        const response = await api.attach(params);
        console.log("+=======> ", response);
        if (response.status === "success") {
            dispatch(makeToast("Liên kết tài khoản thành công", ToastType.SUCCESS))
            dispatch(setNewInfo({}));
            console.log(response);
            if (response.user) {
                dispatch(setMyInfo(response.user));
                dispatch(setUser(response.user));
            }
        }
    } catch (e) {
        console.log(e)
    }
}
export const detachSocial = (params) => async (dispatch) => {
    try {
        const response = await api.detach(params);
        console.log("+=======> ", response);
        if (response.status === "success") {
            dispatch(makeToast("Hủy liên kết thành công", ToastType.SUCCESS))
            dispatch(setNewInfo({}));
            console.log(response);
            if (response.user) {
                dispatch(setMyInfo(response.user));
                dispatch(setUser(response.user));
            }
        }
    } catch (e) {
        console.log(e)
    }
}

const initialState = {
    myInfo: {},
    newInfo: {},
};

const info = createSlice({
    name: "info",
    initialState,
    reducers: {
        setMyInfo: (state, action) => {
            state.myInfo = action.payload;
            state.newInfo.settings = action.payload.settings;
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
