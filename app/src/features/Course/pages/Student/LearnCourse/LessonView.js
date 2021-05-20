import { Box, useMediaQuery } from '@material-ui/core';
import CKViewer from 'commons/components/CKEditor/CKViewer';
import VideoPlayer from 'commons/components/VideoPlayer/VideoPlayer';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function LessonView() {
    const dispatch = useDispatch();
    const lesson = useSelector(state => state.learnCourse.lesson);
    const isMobile = useMediaQuery("(max-width: 760px)");
    const user = useSelector(state => state.auth.user);
    return (
        <div>
            {
                isMobile ? (
                    !!lesson.video_url && <VideoPlayer width="inherit" videoHeight="300px" url={lesson.video_url} />
                ) : (
                    !!lesson.video_url && <VideoPlayer width="inherit" videoHeight="500px" url={lesson.video_url} />
                )
            }
            {!!lesson.content &&
                <Box mx={isMobile ? 0 : 5} mt={2} p={2} style={{ backgroundColor: "white", border: "1px solid #cecece60", borderRadius: "5px" }}>
                    <CKViewer content={lesson.content} />
                </Box>
            }
        </div>

    )
}
