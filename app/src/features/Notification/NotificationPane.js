import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearNotifications, fetchNotifications, NotificationType, readNotifications } from 'features/Notification/notificationSlice'
import { Avatar, Badge, Box, Divider, ListItem, MenuItem, Typography } from '@material-ui/core';
import { getTimePastText } from 'commons/functions/timePast';
import { Skeleton } from '@material-ui/lab';
import { useHistory } from 'react-router';
import CourseStatusNotification from './components/CourseStatusNotification';
import BuyCourseNotification from './components/BuyCourseNotification';
import RateCourseNotification from './components/RateCourseNotification';
export default function NotificationPane() {
    const dispatch = useDispatch();
    const id = useSelector(state => state.auth.user.id);
    const notifications = useSelector(state => state.notification.notifications)
    const page = useSelector(state => state.notification.page)
    const lastPage = useSelector(state => state.notification.lastPage)
    const ref = useRef(null);
    const history = useHistory();
    useEffect(() => {
        if (id) {
            dispatch(clearNotifications());
            dispatch(fetchNotifications());
        }
    }, [id])

    const trackLoadNoties = () => {
        const el = document.getElementById('notificationMenu');
        try {
            if (el.scrollTop + el.offsetHeight === el.scrollHeight) {
                dispatch(fetchNotifications());
            }
        } catch (e) {
            el.removeEventListener('scroll', trackLoadNoties);
        }
    };

    useEffect(() => {
        const el = document.getElementById('notificationMenu');
        el.addEventListener('scroll', trackLoadNoties);
        return () => {
            el.removeEventListener('scroll', trackLoadNoties);
        }
    }, [])
    return (
        <Box ref={ref}>
            {
                notifications.data.length > 0 &&
                notifications.data.map(data => {
                    const notification = data.data;
                    const type = data.type;

                    return (
                        <ListItem
                            button
                            dense={true}
                            disableGutters={true}
                            style={{ padding: 0 }}
                            divider={true}
                            onClick={(e) => {
                                if (!data.read_at)
                                    dispatch(readNotifications(data.id));
                            }}
                        >
                            <Box
                                display="flex"
                                px={2}
                                py={1}
                                style={{
                                    width: "100%",
                                    backgroundColor: !data.read_at ? "#a4b0dc52" : ""
                                }}
                                button
                            >
                                <Box mr={1} >
                                    <Badge
                                        color="primary"
                                        overlap="circle"
                                        variant="dot"
                                        invisible={data.read_at}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        < Avatar src={notification.user?.avatar_url} size="small" />
                                    </Badge>
                                </Box>
                                {
                                    type === NotificationType.RATE_COURSE ?
                                        <RateCourseNotification
                                            notification={notification}
                                            history={history}
                                        />
                                        : type === NotificationType.BUY_COURSE ?
                                            <BuyCourseNotification
                                                notification={notification}
                                                history={history}
                                            />
                                            : type === NotificationType.COURSE_STATUS ?
                                                <CourseStatusNotification
                                                    notification={notification}
                                                    history={history}
                                                /> : ''
                                }
                            </Box>
                        </ListItem>

                    )
                })
            }
            {
                lastPage > page + 1 ?
                    Array(2).fill(
                        <div>
                            <Box display="flex" px={2} py={1}>
                                <Box mr={1}>
                                    <Skeleton variant="circle" width={40} height={40} />
                                </Box>
                                <Box>
                                    <Skeleton variant="text" width={"20vw"} />
                                    <Skeleton variant="text" width={"8vw"} />
                                </Box>
                            </Box>
                            <Divider />
                        </div>
                    )
                    : lastPage === page + 1 ? (
                        <Box display="flex" px={2} py={1}>
                            <Box mr={1}>
                                <Skeleton variant="circle" width={40} height={40} />
                            </Box>
                            <Box>
                                <Skeleton variant="text" width={"20vw"} />
                                <Skeleton variant="text" width={"8vw"} />
                            </Box>
                        </Box>
                    ) : <span></span>
            }
        </Box >
    )
}
