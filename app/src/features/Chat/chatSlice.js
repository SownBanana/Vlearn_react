import { createSlice } from "@reduxjs/toolkit";
import api from "commons/api/chat";
export const fetchChats = () => async (dispatch) => {
    try {
        const response = await api.fetch();
        console.log("+=======> ", response);
        if (response.status === "success") {
            dispatch(appendMessages(response.data));
            // dispatch(setChats(response.data));
        }
    } catch (e) {
        console.log("Fail", e);
    }
};
export const sendChat = (params) => async (dispatch) => {
    try {
        dispatch(setStatus("not set"));
        params.timestamp = Date.now() / 1000;
        dispatch(appendMyMessage(params));
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
export const chatWithUser = (id) => async (dispatch) => {
    try {
        const response = await api.getChatRoom(id);
        if (response.status === "success") {
            if (response.type === "new") {
                await dispatch(appendMessages(response.data))
                dispatch(setCurrent(response.id))
            } else {
                dispatch(setCurrent(response.id));
            }
        }
        dispatch(setForceOpenChat(true));
    } catch (e) {
        console.log("Fail", e);
    }
};

const initialState = {
    chats: {
    },
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

const chat = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setForceOpenChat: (state, action) => {
            state.forceOpenChat = action.payload;
        },
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setCurrent: (state, action) => {
            const id = action.payload;
            state.current = state.chats[id];
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        appendMessage: (state, action) => {
            const { sender_id, room_id, content, assets, timestamp, create_at, users } = action.payload;
            console.log("Mess==>", action.payload);
            if (create_at) timestamp = Date.parse(create_at) / 1000;
            if (state.current.id === room_id) {
                state.current.messages.push({
                    sender_id: sender_id,
                    content,
                    timestamp,
                    assets
                });
            }
            if (state.chats[room_id] === null || state.chats[room_id] === undefined) {
                if (state.chats.length > 5) delete state.chats[Object.keys(state.chats)[0]];
                state.chats[room_id] = {
                    id: room_id,
                    users,
                    messages: []
                }
            }
            if (content !== null && content !== undefined) {
                state.chats[room_id].messages.push({
                    sender_id: sender_id,
                    content,
                    timestamp,
                    assets
                });
            }
            state.forceOpenChat = true;
        },
        appendMessages: (state, action) => {
            var rooms = action.payload;
            rooms.map(room => {
                const { id, users, messages } = room;
                const room_id = id;
                messages.map((m) => {
                    return m.timestamp = new Date(m.created_at) / 1000
                })
                if (state.current.id === id) {
                    messages.map(m => {
                        state.current.messages.push(m);
                    });
                }
                if (state.chats[room_id] === null || state.chats[room_id] === undefined) {
                    if (state.chats.length > 5) delete state.chats[Object.keys(state.chats)[0]];
                    state.chats[room_id] = {
                        id,
                        users,
                        messages
                    }
                }
                else {
                    state.chats[room_id].messages = messages;
                }

            })
        },
        appendMyMessage: (state, actions) => {
            state.current.messages.push({
                sender_id: actions.payload.sender_id,
                content: actions.payload.content,
                timestamp: actions.payload.timestamp,
                assets: actions.payload.files,
            })
        }
    },
});

export const {
    setChats,
    setStatus,
    setCurrent,
    appendMessage,
    appendMyMessage,
    appendMessages,
    setForceOpenChat
} = chat.actions;
export default chat.reducer;
