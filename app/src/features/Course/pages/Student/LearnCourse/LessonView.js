import { Box, makeStyles, useMediaQuery } from '@material-ui/core';
import CKViewer from 'commons/components/CKEditor/CKViewer';
import VideoPlayer from 'commons/components/VideoPlayer/VideoPlayer';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function LessonView() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const lesson = useSelector(state => state.learnCourse.lesson);
    const isMobile = useMediaQuery("(max-width: 660px)");
    const user = useSelector(state => state.auth.user);
    const bounder = useRef();
    const mobileVideo = useRef();
    const [status, setStatus] = useState({ isFloat: false });
    // const [isFloat, setFloat] = useState();
    // var isFloat = false;
    const trackScrolling = () => {
        try {

            if (!status.isFloat) {
                // console.log(status.isFloat, window.scrollY);
                // const video = bounder.current.children[0]
                // if (video.getBoundingClientRect().top < -100) {
                if (window.scrollY > 500) {
                    setStatus({ isFloat: true });
                    status.isFloat = true;
                    // isFloat = true;
                }
            } else {
                console.log("small", status.isFloat, window.scrollY)
                if (window.scrollY < 400) {
                    // setFloat((state) => state = false);
                    setStatus({ isFloat: false });
                    status.isFloat = false;
                    // isFloat = false;
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
            <Box ref={bounder} ml={isMobile ? 0 : 5} py={1} style={{ backgroundColor: "white", border: "1px solid #cecece60", borderRadius: "5px" }}>
                <Box height={isMobile ? "30vh" : "70vh"}>
                    <div className={status.isFloat ? (isMobile ? classes.floatVideoMobile : classes.floatVideo) : ''} >
                        {
                            isMobile ? (
                                !!lesson.video_url && <VideoPlayer width="inherit" videoHeight="30vh" url={lesson.video_url} />
                            ) : (
                                !!lesson.video_url && <VideoPlayer width="inherit" videoHeight="70vh" url={lesson.video_url} />
                            )
                        }
                    </div>
                </Box>
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
    }
}))

