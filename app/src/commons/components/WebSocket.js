import usePusher from 'commons/PusherCommon';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { appendMessage, fetchChats } from 'features/Chat/chatSlice'

export default function WebSocket() {
    const id = useSelector((state) => state.auth.user.id);
    const pusher = usePusher(id);
    const dispatch = useDispatch();

    // console.log("Pusher: ", pusher);
    // if (pusher) console.log("Socket: ", pusher.socketId());
    useEffect(() => {
        // dispatch(fetchChats());
        console.log("Check login chat for", id);
        if (id && pusher) {
            pusher.leave("App.PrivateMessage." + id);
            console.log("connect chat channel");
            pusher
                .private("App.PrivateMessage." + id)
                .listen(`PrivateMessageSend`, (data) => {
                    console.log(pusher.socketId());
                    console.log(data);
                    dispatch(appendMessage(data.data));
                });
        }
    }, [pusher, id]);

    return (<span></span>)
}
