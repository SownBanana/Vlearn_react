import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoughtCourses, fetchSchedules, clearBoughtCourses } from './studentDashSlice';
import Schedule from 'features/Dashboard/components/Schedule';
import { Box, FormControl, Grid, MenuItem, Select, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import BreadCrumbs from 'commons/components/BreadCrumbs';
import CourseItem from 'features/Course/components/Course/CourseItem';

export default function StudentDashboard() {

    const schedules = useSelector(state => state.dashStudent.schedules)
    const courseResources = useSelector(state => state.dashStudent.courseResources)
    const sectionResources = useSelector(state => state.dashStudent.sectionResources)
    const coursesData = useSelector(state => state.dashStudent.coursesData)
    const courses = coursesData?.data;

    const [mainResourceName, setMainResourceName] = useState("section")

    const [resources, setResources] = useState([
        {
            fieldName: 'section',
            title: 'Chương học',
            instances: sectionResources,
        },
        {
            fieldName: 'course',
            title: 'Khóa học',
            instances: courseResources,
        },
    ])
    const dispatch = useDispatch()
    const id = useSelector(state => state.auth.user.id)

    useEffect(() => {
        console.log("reset rs")
        setResources([
            {
                fieldName: 'course',
                title: 'Khóa học',
                instances: courseResources,
            },
            {
                fieldName: 'section',
                title: 'Chương học',
                instances: sectionResources,
            },
        ])
    }, [courseResources, sectionResources])

    useEffect(() => {
        dispatch(fetchSchedules())
        dispatch(clearBoughtCourses())
        dispatch(fetchBoughtCourses())
    }, [id])

    const trackLoadCourses = () => {
        const el = document.getElementById('course_pane');
        try {
            if (el.scrollTop + el.offsetHeight === el.scrollHeight) {
                dispatch(fetchBoughtCourses());
            }
        } catch (e) {
            el.removeEventListener('scroll', trackLoadCourses);
        }
    };
    useEffect(() => {
        const el = document.getElementById('course_pane');
        el.addEventListener('scroll', trackLoadCourses);
        return () => {
            el.removeEventListener('scroll', trackLoadCourses);
        }
    }, [])

    return (
        <Box >
            <BreadCrumbs
                current="Dashboard"
            >
                <Box mx={2} display="flex" justifyContent="flex-start" alignItems="center">
                    <Typography
                        style={{ marginRight: 5, fontWeight: "bold" }}
                        variant="subtitle1"
                        color="textSecondary">Nhóm theo: </Typography>
                    <FormControl variant="outlined" size="small">

                        <Select
                            value={mainResourceName}
                            onChange={e => setMainResourceName(e.target.value)}
                        >
                            {resources.map(resource => (
                                <MenuItem key={resource.fieldName} value={resource.fieldName}>
                                    {resource.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </BreadCrumbs>
            <Box mx={{ xs: 0, md: 2 }} >
                <Typography style={{ textAlign: "left", marginTop: 10, marginBottom: 10 }} variant="h5" color="textSecondary">Thời khóa biểu</Typography>

                <Schedule
                    schedules={schedules}
                    resources={resources}
                    mainResourceName={mainResourceName}
                />
            </Box>
            <Box id={'course_pane'} mx={{ xs: 0, md: 2 }} mt={3} style={{
                height: 550,
                overflow: "auto",
            }}>
                <Typography style={{ textAlign: "left", marginTop: 10, marginBottom: 10 }} variant="h5" color="textSecondary">Khóa học của tôi</Typography>
                <Grid
                    md={12}
                    container
                    spacing={4}
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    alignContent="center" >
                    {
                        courses ?
                            courses.map((course) => {
                                return (
                                    <Grid item md={3} sm={4} xs={12} key={course.id} >
                                        <Box>
                                            <CourseItem course={course} />
                                        </Box>
                                    </Grid>
                                );
                            }) : (
                                Array(8).fill(
                                    <Grid item md={3} sm={4} xs={12}>
                                        <Box>
                                            <Skeleton variant="rect" width="100%" height={200} />
                                            <Skeleton />
                                            <Skeleton width="60%" />
                                        </Box>
                                    </Grid>
                                )
                            )
                    }
                </Grid>
            </Box>
        </Box >
    );
}