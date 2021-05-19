import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/topic";

export const fetch = () => async (dispatch) => {
    try {
        const response = await api.fetch();
        console.log("+=======> ", response);
        if (response.status === "success") {
            dispatch(setTopics(response.data));
        }
    } catch (e) {
        console.log("Fail", e);
    }
};

const initialState = {
    topics: []
};

const topic = createSlice({
    name: "topic",
    initialState,
    reducers: {
        setTopics: (state, action) => {
            state.topics = action.payload;
        },
    },
});

export const {
    setTopics,
} = topic.actions;
export default topic.reducer;
