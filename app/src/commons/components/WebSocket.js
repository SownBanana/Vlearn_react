import usePusher from 'commons/PusherCommon';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { appendMessage } from 'features/Chat/chatSlice'
import { pushNotification } from 'features/Notification/notificationSlice';

export default function WebSocket() {
    const id = useSelector((state) => state.auth.user.id);
    const pusher = usePusher(id);
    const dispatch = useDispatch();

    // console.log("Pusher: ", pusher);
    // if (pusher) console.log("Socket: ", pusher.socketId());
    useEffect(() => {
        // dispatch(fetchChats());
        if (id && pusher) {
            //User personal channel
            pusher.leave("App.Models.User." + id);
            console.info("SOCKET===========>connect personal channel");
            pusher
                .private("App.Models.User." + id)
                .notification((notification) => {
                    console.log("Notification come========", notification);
                    dispatch(pushNotification({ ...notification, read_at: null }))
                })

            //Chat channel
            pusher.leave("App.PrivateMessage." + id);
            console.info("SOCKET===========>connect chat channel");
            pusher
                .private("App.PrivateMessage." + id)
                .listen(`PrivateMessageSend`, (data) => {
                    // console.log(pusher.socketId());
                    // console.log(data);
                    dispatch(appendMessage(data.data));
                });
        }

    }, [pusher, id, dispatch]);

    return (<span></span>)
}
