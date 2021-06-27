import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CourseContent from 'features/Course/pages/Student/LearnCourse/CourseContent'
import LessonView from 'features/Course/pages/Student/LearnCourse/LessonView'
import QuestionView from 'features/Course/pages/Student/LearnCourse/QuestionView'
import { clearCourse, fetchCourseSummary } from 'features/Course/pages/Student/LearnCourse/learnSlice'
import { useParams } from 'react-router';
import { Box, Grid } from '@material-ui/core';
import { LESSON, LIVE_LESSON, QUESTION } from 'commons/enums/LearnView';
import LiveLessonView from 'features/Course/pages/Student/LearnCourse/LiveLessonView';
export default function LearnCourse() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const learnView = useSelector(state => state.learnCourse.learnView)
    useEffect(() => {
        dispatch(fetchCourseSummary(id))
        return () => {
            dispatch(clearCourse());
        }
    }, [dispatch, id])
    return (
        <Box mt={2}>
            <Box mx={2}>
                <Grid container direction="row" spacing={1}>
                    <Grid item md={9} xs={12}>
                        {learnView === LESSON && <LessonView />}
                        {learnView === QUESTION && <QuestionView />}
                        {learnView === LIVE_LESSON && <LiveLessonView />}
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <CourseContent />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
