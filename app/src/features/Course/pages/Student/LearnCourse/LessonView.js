import { Box, useMediaQuery } from '@material-ui/core';
import CKViewer from 'commons/components/CKEditor/CKViewer';
import VideoPlayer from 'commons/components/VideoPlayer/VideoPlayer';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Jutsu } from 'react-jutsu' // Component
import { useJitsi } from 'react-jutsu' // Custom hook
import { Skeleton } from '@material-ui/lab';

export default function LessonView() {
    const dispatch = useDispatch();
    const lesson = useSelector(state => state.learnCourse.lesson);
    const isMobile = useMediaQuery("(max-width: 760px)");
    const user = useSelector(state => state.auth.user);
    return (
        <div>
            {/* <Jutsu
                subject={lesson.name}
                configOverwrite={{
                    disableTileView: true,
                }}
                interfaceConfigOverwrite={{
                    APP_NAME: "Vlearn",
                    SHOW_JITSI_WATERMARK: false,
                    SHOW_WATERMARK_FOR_GUESTS: false,
                    SHOW_DEEP_LINKING_IMAGE: false,
                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                    ENFORCE_NOTIFICATION_AUTO_DISMISS_TIMEOUT: 100,
                    RECENT_LIST_ENABLED: false,
                    GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
                    DISPLAY_WELCOME_PAGE_CONTENT: false,
                    // DISABLE_FOCUS_INDICATOR: true,
                    // DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
                    SET_FILMSTRIP_ENABLED: false,
                    HIDE_KICK_BUTTON_FOR_GUESTS: true,
                    filmStripOnly: true,
                    DEFAULT_LOGO_URL: "",
                    TOOLBAR_BUTTONS: ([
                        'microphone', 'camera', 'desktop', 'fullscreen',
                        'fodeviceselection', 'profile', 'info', 'chat', 'record', 'recording',
                        'etherpad', 'settings', 'raisehand',
                        'videoquality', 'filmstrip', 'stats', 'shortcuts',
                        'videobackgroundblur', 'download', 'help'
                    ]),
                }}
                containerStyles={{ width: '900px', height: '500px' }}
                roomName={"phamson"}
                displayName={user.username}
                domain={"meet.vlearn.club"}
                onJitsi={JitsiMeetAPI => {
                    console.info("===================>Hello ", JitsiMeetAPI)
                    JitsiMeetAPI.executeCommand('toggleFilmStrip')
                }}
                loadingComponent={<Skeleton variant="rect" width="900px" height="500px" />}

            /> */}
            {
                isMobile ? (
                    !!lesson.video_url && <VideoPlayer width="inherit" videoHeight="300px" url={lesson.video_url} />
                ) : (
                    !!lesson.video_url && <VideoPlayer width="inherit" videoHeight="500px" url={lesson.video_url} />
                )
            }
            <Box mx={isMobile ? 0 : 5} mt={2} p={2} style={{ backgroundColor: "white", border: "1px solid #cecece60", borderRadius: "5px" }}>
                {!!lesson.content && <CKViewer content={lesson.content} />}
            </Box>
        </div>

    )
}
