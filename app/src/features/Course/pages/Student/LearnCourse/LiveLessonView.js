import { Box, useMediaQuery } from '@material-ui/core';
import CKViewer from 'commons/components/CKEditor/CKViewer';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Jutsu } from 'react-jutsu' // Component
import { useJitsi } from 'react-jutsu' // Custom hook
import { Skeleton } from '@material-ui/lab';
import { UserRole } from 'features/Authenticate/constance';
import { INSTRUCTOR_CONFIG, INSTRUCTOR_INTERFACE, STUDENT_CONFIG, STUDENT_INTERFACE } from 'commons/enums/JitsiConfig';
import { fromTimeString } from 'commons/functions/humanTime';
import { smallTime } from 'commons/functions/humanTimeDuration';

export default function LiveLessonView() {
    const dispatch = useDispatch();
    const liveLesson = useSelector(state => state.learnCourse.liveLesson);
    const isMobile = useMediaQuery("(max-width: 760px)");
    const user = useSelector(state => state.auth.user);
    const [leftTime, setLeftTime] = useState(false);
    const startTime = new Date(liveLesson.start_time);
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
    }, [])


    return (
        <div>
            {
                (leftTime <= 0 || new Date(liveLesson.start_time) <= Date.now())
                    && (liveLesson.end_time === null || new Date(liveLesson.end_time) > Date.now())
                    ?
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
                                ? { width: '350px', height: '300px' }
                                : { width: '900px', height: '500px' }
                        }
                        subject={liveLesson.name}
                        roomName={liveLesson.uuid}
                        displayName={user.username}
                        // domain={process.env.REACT_APP_LIVE_DOMAIN}
                        domain={"meet.vlearn.club"}
                        onJitsi={JitsiMeetAPI => {
                            console.info("Init Jitsi success ", JitsiMeetAPI)
                            JitsiMeetAPI.executeCommand('toggleFilmStrip')
                        }}
                        loadingComponent={<Skeleton variant="rect" width="900px" height="500px" />}

                    />
                    : new Date(liveLesson.start_time) <= Date.now()
                        ?
                        <Box>
                            Chưa đến giờ học, khóa học bắt đầu lúc {fromTimeString(liveLesson.start_time)}
                            <Box>
                                Khóa học bắt đầu sau <span style={{ fontWeight: "bold" }}>{smallTime(leftTime)}</span>
                            </Box>
                        </Box>
                        :
                        <Box>
                            Khóa học đã kết thúc vào {fromTimeString(liveLesson.end_time)}
                        </Box>
            }

            <Box mx={isMobile ? 0 : 5} mt={2} p={2} style={{ backgroundColor: "white", border: "1px solid #cecece60", borderRadius: "5px" }}>
                {!!liveLesson.content && <CKViewer content={liveLesson.content} />}
            </Box>
        </div>

    )
}
