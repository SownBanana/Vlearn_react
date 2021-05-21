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
    const [isFloat, setFloat] = useState(false);

    const trackScrolling = () => {
        setFloat(false);
        console.log(isFloat, window.scrollY);
        const video = bounder.current.children[0]
        if (video.getBoundingClientRect().top < -200) {
            setFloat(true);
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
                <div className={isFloat && isMobile ? classes.floatVideoMobile : isFloat && !isMobile ? classes.floatVideo : ''} >

                    {
                        isMobile ? (
                            !!lesson.video_url && <VideoPlayer width="inherit" videoHeight="200px" url={lesson.video_url} />
                        ) : (
                            !!lesson.video_url && <VideoPlayer width="inherit" videoHeight="500px" url={lesson.video_url} />
                        )
                    }
                </div>
                {!!lesson.content &&
                    <Box mt={2} px={6}>
                        <CKViewer content={lesson.content} />
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
        top: theme.spacing(8),
        left: 0
    }
}))

