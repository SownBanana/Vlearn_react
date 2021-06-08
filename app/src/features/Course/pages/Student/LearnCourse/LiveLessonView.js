import React, { useEffect, useState } from 'react'
import {
    Box,
    IconButton,
    makeStyles,
    Paper,
    Tab,
    Tabs,
    useMediaQuery,
    useTheme
} from '@material-ui/core';
import CKViewer from 'commons/components/CKEditor/CKViewer';
import { useDispatch, useSelector } from 'react-redux';
import { Jutsu } from 'react-jutsu' // Component
import { Skeleton, TabPanel } from '@material-ui/lab';
import { UserRole } from 'features/Authenticate/constance';
import { INSTRUCTOR_CONFIG, INSTRUCTOR_INTERFACE, STUDENT_CONFIG, STUDENT_INTERFACE } from 'commons/enums/JitsiConfig';
import { fromTimeString } from 'commons/functions/humanTime';
import { smallTime } from 'commons/functions/humanTimeDuration';
import usePurePusher from 'commons/PurePusher';
import WhiteBoard from './components/WhiteBoard';
import { chunkString } from 'commons/functions/chunkString';
import api from 'commons/api/course/liveLesson';
import uuidv4 from 'commons/functions/uuidv4';
import { appendMessage } from './lessonChatSlice';
import { Mic, MicNone, MicOff, ScreenShare, StopScreenShare, Videocam, VideocamOff } from '@material-ui/icons';
import StudentList from './components/StudentList';
import { makeToast, ToastType } from 'features/Toast/toastSlices';
import ClassResource from './components/ClassResource';
import { LIVE_LESSON } from 'commons/enums/LearnView';

export default function LiveLessonView() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const liveLesson = useSelector(state => state.learnCourse.liveLesson);
    const isMobile = useMediaQuery("(max-width: 760px)");
    const user = useSelector(state => state.auth.user);
    const pusher = usePurePusher(user.id);
    const [leftTime, setLeftTime] = useState(false);
    const [tab, setTab] = React.useState(0);
    const [channel, setChannel] = useState(null);
    const [boardData, setBoardData] = useState(null);
    const [showBoardData, setShowBoardData] = useState(null);
    var receiveBoardData = { id: 0 };
    const [clearBoard, setClearBoard] = useState(false);
    const uuid = uuidv4();
    const [reloadVideo, setReloadVideo] = useState(0);
    const [jitsiApi, setJitsiApi] = useState(null);

    const [permission, setPermission] = useState(false);
    const [audio, setAudio] = useState(false);
    const [video, setVideo] = useState(false);
    const [screen, setScreen] = useState(false);

    const handleReceiveBoardData = (dataPackage) => {
        // console.log(dataPackage.id, receiveBoardData.id, dataPackage.id === receiveBoardData.id)
        if (dataPackage.status === 'clear') {
            setClearBoard(true);
        }
        else if (dataPackage.id === receiveBoardData.id) {
            // debugger
            receiveBoardData = { ...receiveBoardData, data: receiveBoardData.data + dataPackage.data };
            if (dataPackage.index === dataPackage.last) setShowBoardData(receiveBoardData.data);
            // console.log("concated===", receiveBoardData);
        } else if (dataPackage.id > receiveBoardData.id) {
            // debugger
            receiveBoardData = { id: dataPackage.id, data: dataPackage.data };
            if (dataPackage.index === dataPackage.last) setShowBoardData(receiveBoardData.data);
            // console.log("original===", receiveBoardData);
        }
    }

    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
    };

    const boardHandle = (data) => {
        setBoardData(data);
    };


    useEffect(() => {
        if (!permission) {
            if (audio) jitsiApi.executeCommand('toggleAudio');
            if (video) jitsiApi.executeCommand('toggleVideo');
            if (screen) jitsiApi.executeCommand('toggleShareScreen');
        }
    }, [permission])

    useEffect(() => {
        // reloadLiveVideo()
        setReloadVideo(reloadVideo + 1)
        console.log("reload")
        if (liveLesson.board) {
            // console.log("set board")
            setClearBoard(true);
            setShowBoardData(liveLesson.board)
        } else {
            // console.log("clear board")
            setShowBoardData(null);
            setClearBoard(true);
        }
    }, [liveLesson.board])

    useEffect(() => {
        const timeCheck = setInterval(() => {
            setLeftTime(new Date(liveLesson.start_time) - Date.now());
            if (leftTime != false && leftTime <= 0) {
                clearInterval(timeCheck);
            }
        }, 1000);
        return () => {
            clearInterval(timeCheck);
        }
    }, [liveLesson.id])

    useEffect(() => {
        if (user.id && pusher) {
            pusher.unsubscribe("private-App.LiveLesson." + liveLesson.id);
            const inChannel = pusher.subscribe("private-App.LiveLesson." + liveLesson.id);
            setChannel(inChannel);
            console.info("SOCKET===========>connect whiteboard, channel: ", inChannel);
            // inChannel.trigger('client-board-data', { message: 'Hello world!' })
            inChannel.bind('client-board-data', (data) => {
                if (data.uuid !== uuid) {
                    // console.log("Board data incoming ====>: ", data);
                    handleReceiveBoardData(data);
                }
            })
            inChannel.bind('App\\Events\\LiveLessonCommentEvent', (data) => {
                console.log(data)
                dispatch(appendMessage(data.data))
            })
            if (user.role === UserRole.STUDENT) {
                inChannel.bind('client-live-permission', (data) => {
                    if (data.id === user.id || data.id === 0) {
                        dispatch(makeToast(`Bạn vừa ${data.permission ? 'được cấp' : 'bị thu hồi'} quyền thuyết trình`, ToastType.INFO));
                        setPermission(data.permission);
                    }
                })
            }
        }

    }, [pusher, user]);

    useEffect(() => {
        // console.log("==", channel);
        if (boardData) {
            console.log("Data length: ", boardData.length)
            const chunkId = Date.now();
            if (boardData.length < 10000)
                channel.trigger('client-board-data', {
                    sender: user.id,
                    uuid: uuid,
                    id: chunkId,
                    index: 0,
                    last: 0,
                    status: "whole",
                    data: boardData
                })
            else {
                const data = chunkString(boardData, 10000);
                for (let i = 0; i < data.length; i++) {
                    channel.trigger('client-board-data', {
                        sender: user.id,
                        uuid: uuid,
                        id: chunkId,
                        status: "chunk",
                        last: data.length - 1,
                        index: i,
                        data: data[i]
                    })
                }
            }
            api.drawBoard(liveLesson.id, boardData);
        } else if (boardData === '') {
            console.log('Clear board')
            const chunkId = Date.now();
            channel.trigger('client-board-data', {
                sender: user.id,
                id: chunkId,
                status: "clear",
            })
            api.drawBoard(liveLesson.id, boardData);
        }
    }, [boardData])

    return (
        <div>
            {
                liveLesson.start_time && new Date(liveLesson.start_time) > Date.now()
                    ?
                    <Box>
                        Chưa đến giờ học, khóa học bắt đầu lúc {fromTimeString(liveLesson.start_time)}
                        <Box>
                            Khóa học bắt đầu sau <span style={{ fontWeight: "bold" }}>{smallTime(leftTime)}</span>
                        </Box>
                    </Box>
                    : liveLesson.end_time && new Date(liveLesson.end_time) < Date.now() ?
                        <Box>
                            Khóa học đã kết thúc vào {fromTimeString(liveLesson.end_time)}
                        </Box>
                        : <span></span>
            }
            <Paper>
                <Box display={{ sm: "flex" }} justifyContent="space-between" width="100%">
                    <Tabs
                        value={tab}
                        onChange={handleChangeTab}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Lớp học" />
                        <Tab label="Bảng" />
                        <Tab label="Tài liệu" />
                        <Tab label="Thành viên" />
                    </Tabs>
                    {
                        user.role === UserRole.STUDENT ?
                            <Box>
                                <IconButton disabled={!permission} color="primary" onClick={
                                    (e) => {
                                        jitsiApi.executeCommand('toggleAudio')
                                    }
                                }>
                                    {
                                        audio ?
                                            <Mic /> :
                                            <MicOff />
                                    }
                                </IconButton>
                                <IconButton disabled={!permission} color="primary" onClick={
                                    (e) => {
                                        jitsiApi.executeCommand('toggleVideo')
                                    }
                                }>
                                    {
                                        video ?
                                            <Videocam /> :
                                            <VideocamOff />
                                    }
                                </IconButton>
                                <IconButton disabled={!permission} color="primary" onClick={
                                    (e) => {
                                        jitsiApi.executeCommand('toggleShareScreen')
                                    }
                                }>
                                    {
                                        screen ?
                                            <ScreenShare /> :
                                            <StopScreenShare />
                                    }
                                </IconButton>
                            </Box>
                            :
                            <Box>
                                <IconButton onClick={
                                    (e) => {
                                        jitsiApi.executeCommand('muteEveryone');
                                    }
                                }>
                                    <MicNone />
                                </IconButton>
                            </Box>
                    }
                </Box>
            </Paper>
            {
                (leftTime <= 0 || new Date(liveLesson.start_time) <= Date.now())
                && (liveLesson.end_time === null || new Date(liveLesson.end_time) > Date.now())
                &&
                <div
                    className={tab !== 0 && classes.hide}
                    key={reloadVideo}
                >
                    < Jutsu
                        configOverwrite={
                            user.role === UserRole.STUDENT ?
                                STUDENT_CONFIG :
                                INSTRUCTOR_CONFIG
                        }
                        interfaceConfigOverwrite={
                            user.role === UserRole.STUDENT ?
                                STUDENT_INTERFACE :
                                INSTRUCTOR_INTERFACE
                        }
                        containerStyles={
                            isMobile
                                ? { width: '100%', paddingTop: 2 }
                                : { width: '100%', height: '480px', paddingTop: 0 }
                        }
                        subject={liveLesson.name}
                        roomName={liveLesson.uuid}
                        displayName={user.username}
                        // domain={process.env.REACT_APP_LIVE_DOMAIN}
                        domain={"meet.jit.si"}
                        onJitsi={JitsiMeetAPI => {
                            console.info("Init Jitsi success ", JitsiMeetAPI)
                            JitsiMeetAPI.executeCommand('toggleFilmStrip')
                            setJitsiApi(JitsiMeetAPI);
                            if (user.role === UserRole.STUDENT) {
                                JitsiMeetAPI.addListener('audioMuteStatusChanged', (e) => {
                                    setAudio(!e.muted)
                                })
                                JitsiMeetAPI.addListener('videoMuteStatusChanged', (e) => {
                                    setVideo(!e.muted)
                                })
                                JitsiMeetAPI.addListener('screenSharingStatusChanged', (e) => {
                                    setScreen(e.on)
                                })
                            }
                        }}
                        loadingComponent={<Skeleton variant="rect" width="900px" height="500px" />}

                    />
                </div>
            }
            <div
                className={tab !== 1 && classes.softHide}
                style={{ width: "100%" }}
            >
                {/* <Board /> */}
                <WhiteBoard dataHandle={boardHandle} data={showBoardData} clearTrigger={clearBoard} setClearTrigger={setClearBoard} />
            </div>
            <div
                className={tab !== 2 && classes.hide}
                style={{ width: "100%" }}
            >
                <ClassResource lesson={liveLesson} type={LIVE_LESSON} />
            </div>
            <div
                className={tab !== 3 && classes.hide}
                style={{ width: "100%" }}
            >
                <StudentList channel={channel} />
            </div>
            <Box mx={isMobile ? 0 : 5} mt={2} p={2} style={{ backgroundColor: "white", border: "1px solid #cecece60", borderRadius: "5px" }}>
                {!!liveLesson.content && <CKViewer content={liveLesson.content} />}
            </Box>
            {/* </TabContext.Provider> */}
        </div>

    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    hide: {
        display: "none",
        padding: 5,
    },
    softHide: {
        // display: "none",
        padding: 5,
        opacity: 0,
        height: 0,
        overflow: "hidden"
    }
}));