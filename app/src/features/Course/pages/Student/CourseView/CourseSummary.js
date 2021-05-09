import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCourseSummary, clearCourse } from 'features/Course/courseSlice'
import { Grid, Box } from '@material-ui/core'
import BreadCrumbs from "commons/components/BreadCrumbs";

export default function CourseSummary() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const course = useSelector(state => state.course.course)
    useEffect(() => {
        dispatch(fetchCourseSummary(id));
        return () => {
            dispatch(clearCourse());
        }
    }, [dispatch, id])
    return (
        <Box>
            <BreadCrumbs
                links={[{ link: `/courses`, description: "Khóa học" }]}
                current="Khóa học">
            </BreadCrumbs>
            <Grid container spacing={1}>
                {course}
            </Grid>
        </Box>
    )
}
