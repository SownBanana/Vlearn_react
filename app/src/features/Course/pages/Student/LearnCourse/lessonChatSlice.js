import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/course/chatRoom";
export const fetchLessonChats = (id) => async (dispatch) => {
    try {
        const response = await api.lesson(id);
        console.log("+=======> ", response);
        if (response.status === "success") {
            dispatch(appendMessages(response.data));
        }
    } catch (e) {
        console.log("Fail", e);
    }
};
export const fetchLiveLessonChats = (id) => async (dispatch) => {
    try {
        const response = await api.liveLesson(id);
        console.log("+=======> ", response);
        if (response.status === "success") {
            dispatch(appendMessages(response.data));
        }
    } catch (e) {
        console.log("Fail", e);
    }
};

export const sendChat = (params) => async (dispatch) => {
    try {
        dispatch(setStatus("not set"));
        params.timestamp = Date.now() / 1000;
        // dispatch(appendMyMessage(params));
        const response = await api.send(params);
        console.log("+=======> ", response);
        if (response.status !== "success") {
            dispatch(setStatus("failed"));
        }
    } catch (e) {
        console.log("Fail", e);
        dispatch(setStatus("failed"));
    }
};


const initialState = {
    current: {
        id: 0,
        users: [
        ],
        messages: [
        ]
    },
    forceOpenChat: false,
    newMess: false,
};

const lessonChat = createSlice({
    name: "lessonChat",
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        appendMessage: (state, action) => {
            const { sender_id, sender, room_id, content, assets, timestamp, create_at } = action.payload;
            console.log("Mess==>", action.payload);
            if (create_at) timestamp = Date.parse(create_at) / 1000;
            if (state.current.id === room_id) {
                state.current.messages.push({
                    sender_id,
                    sender,
                    content,
                    assets,
                    timestamp
                });
            }
        },
        appendMessages: (state, action) => {
            state.current = action.payload;
        },
        appendMyMessage: (state, actions) => {
            state.current.messages.push({
                sender_id: actions.payload.sender_id,
                sender: actions.payload.sender,
                content: actions.payload.content,
                timestamp: actions.payload.timestamp,
                assets: actions.payload.assets
            })
        }
    },
});

export const {
    setStatus,
    appendMessage,
    appendMyMessage,
    appendMessages,
} = lessonChat.actions;
export default lessonChat.reducer;
