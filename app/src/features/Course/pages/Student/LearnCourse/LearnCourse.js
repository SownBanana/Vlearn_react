import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import CourseContent from './CourseContent'
import LessonView from './LessonView'
import { fetchCourseSummary } from 'features/Course/pages/Student/LearnCourse/learnSlice'
import { useParams } from 'react-router';
import { Box, Grid } from '@material-ui/core';
import BreadCrumbs from 'commons/components/BreadCrumbs';
export default function LearnCourse() {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(fetchCourseSummary(id))
    }, [dispatch, id])
    return (
        <Box mt={2}>
            <BreadCrumbs mb={2} current="Khóa học">
            </BreadCrumbs>
            <Box mx={2}>
                <Grid container direction="row" spacing={1}>
                    <Grid item md={10} xs={12}>
                        <LessonView />
                    </Grid>
                    <Grid item md={2} xs={12}>
                        <CourseContent />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
