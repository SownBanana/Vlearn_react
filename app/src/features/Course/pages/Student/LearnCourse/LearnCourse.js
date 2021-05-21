import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CourseContent from './CourseContent'
import LessonView from './LessonView'
import QuestionView from './QuestionView'
import { fetchCourseSummary } from 'features/Course/pages/Student/LearnCourse/learnSlice'
import { useParams } from 'react-router';
import { Box, Grid } from '@material-ui/core';
import BreadCrumbs from 'commons/components/BreadCrumbs';
import { LESSON, LIVE_LESSON, QUESTION } from 'commons/enums/LearnView';
export default function LearnCourse() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const learnView = useSelector(state => state.learnCourse.learnView)
    useEffect(() => {
        dispatch(fetchCourseSummary(id))
    }, [dispatch, id])
    return (
        <Box mt={2}>
            <BreadCrumbs mb={2} current="Khóa học">
            </BreadCrumbs>
            <Box mx={2}>
                <Grid container direction="row" spacing={1}>
                    <Grid item md={9} xs={12}>
                        {learnView === LESSON && <LessonView />}
                        {learnView === QUESTION && <QuestionView />}
                        {learnView === LIVE_LESSON && <LessonView />}
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <CourseContent />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
