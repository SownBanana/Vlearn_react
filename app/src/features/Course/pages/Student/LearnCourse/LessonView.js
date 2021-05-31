import { Box, makeStyles, Paper, Tab, Tabs, useMediaQuery } from '@material-ui/core';
import CKViewer from 'commons/components/CKEditor/CKViewer';
import VideoPlayer from 'commons/components/VideoPlayer/VideoPlayer';
import { LESSON } from 'commons/enums/LearnView';
import usePusher from 'commons/PusherCommon';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ClassResource from './components/ClassResource';
import { appendMessage } from './lessonChatSlice';

export default function LessonView() {
    const classes = useStyles();
    const lesson = useSelector(state => state.learnCourse.lesson);
    const isMobile = useMediaQuery("(max-width: 660px)");
    const bounder = useRef();
    // const mobileVideo = useRef();
    const [status, setStatus] = useState({ isFloat: false });
    const [tab, setTab] = React.useState(0);
    const id = useSelector((state) => state.auth.user.id);
    const pusher = usePusher(id);
    const dispatch = useDispatch();

    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        // dispatch(fetchChats());
        if (id && pusher && lesson.id) {
            pusher.leave("App.Lesson." + lesson.id);
            pusher
                .private("App.Lesson." + lesson.id)
                .listen(`LessonCommentEvent`, (data) => {
                    console.log(data)
                    dispatch(appendMessage(data.data))
                });
        }

    }, [pusher, id, lesson]);

    const trackScrolling = () => {
        try {

            if (!status.isFloat) {

                if (window.scrollY > 500) {
                    setStatus({ isFloat: true });
                    status.isFloat = true;
                }
            } else {
                // console.log("small", status.isFloat, window.scrollY)
                if (window.scrollY < 400) {
                    setStatus({ isFloat: false });
                    status.isFloat = false;
                }
            }
        } catch (e) {
            document.removeEventListener('scroll', trackScrolling);
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', trackScrolling);
        return () => {
            document.removeEventListener('scroll', trackScrolling);
        }
    }, [])
    return (
        <div>
            <Paper>
                <Tabs
                    value={tab}
                    onChange={handleChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Bài học" />
                    <Tab label="Tài liệu" />
                </Tabs>
            </Paper>
            <Box ref={bounder} mt={2} ml={isMobile ? 0 : 5} py={1} style={{ backgroundColor: "white", border: "1px solid #cecece60", borderRadius: "5px" }}>
                <div
                    className={tab !== 0 && classes.hide}
                    style={{ width: "100%" }}
                >
                    {
                        !!lesson.video_url &&
                        <Box height={isMobile ? "30vh" : "70vh"}>
                            <div className={status.isFloat ? (isMobile ? classes.floatVideoMobile : classes.floatVideo) : ''} >
                                {
                                    isMobile ? (
                                        <VideoPlayer width="inherit" videoHeight="30vh" url={lesson.video_url} />
                                    ) : (
                                        <VideoPlayer width="inherit" videoHeight="70vh" url={lesson.video_url} />
                                    )
                                }
                            </div>
                        </Box>
                    }
                </div>
                <div
                    className={tab !== 1 && classes.hide}
                    style={{ width: "100%" }}
                >
                    {
                        lesson.assets &&
                        <ClassResource lesson={lesson} type={LESSON} />
                    }
                </div>
                {!!lesson.content &&
                    <Box mt={2} px={isMobile ? 2 : 6}>
                        <CKViewer style={{ overflow: "hidden" }} content={lesson.content} />
                    </Box>
                }
            </Box>
        </div >

    )
}

const useStyles = makeStyles(theme => ({
    floatVideo: {
        position: "fixed",
        top: theme.spacing(8),
        right: theme.spacing(2),
        transform: "scale(0.4)",
        transformOrigin: "100% 0%",
    },
    floatVideoMobile: {
        position: "fixed",
        top: theme.spacing(5),
        left: 0
    },
    hide: {
        display: "none",
        padding: 5,
    },
}))

