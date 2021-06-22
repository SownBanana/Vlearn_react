import { Box, Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumbs from "commons/components/BreadCrumbs";
import CourseItem from 'features/Course/components/Course/CourseItem';
import UserItem from './components/UserItem';
import { useParams } from 'react-router-dom';
import { search as searchAction } from 'features/Home/pages/Search/searchSlice';

export default function SearchPane({ location }) {
    const dispatch = useDispatch()
    const instructors = useSelector(state => state.search.instructors)
    const students = useSelector(state => state.search.students)
    const courses = useSelector(state => state.search.courses)
    // const { search } = useParams();
    useEffect(() => {
        console.log(location.search.split('?q=')[1]);
        dispatch(searchAction(location.search.split('?q=')[1]))
    }, [dispatch, location.search])
    return (
        <Box mt={2}>
            <BreadCrumbs
                links={[{ link: `/`, description: "Trang chủ" }]}
                current="Tìm kiếm"
            >
            </BreadCrumbs>
            <Box mx={{ xs: 2, md: 4 }} >
                <Box mb={5}>
                    <Typography style={{
                        textAlign: "left", marginTop: 10, marginBottom: 10
                    }} variant="body1" color="textSecondary">Giảng viên</Typography>
                    <Grid
                        md={12}
                        container
                        spacing={4}
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        alignContent="center"
                    >
                        {
                            instructors?.map((instructor) => {
                                return (
                                    <Grid item md={3} sm={4} xs={12} key={instructor.id} >
                                        <Box>
                                            <UserItem user={instructor} />
                                        </Box>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </Box>
                <Box mb={5}>
                    <Typography style={{
                        textAlign: "left", marginTop: 10, marginBottom: 10
                    }} variant="body1" color="textSecondary">Học sinh</Typography>
                    <Grid
                        md={12}
                        container
                        spacing={4}
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        alignContent="center"
                    >
                        {
                            students?.map((student) => {
                                return (
                                    <Grid item md={3} sm={4} xs={12} key={student.id} >
                                        <Box>
                                            <UserItem user={student} />
                                        </Box>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </Box>
                <Box>
                    <Typography style={{
                        textAlign: "left", marginTop: 10, marginBottom: 10
                    }} variant="body1" color="textSecondary">Khóa học</Typography>
                    <Grid
                        md={12}
                        container
                        spacing={4}
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        alignContent="center"
                    >
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
            </Box>
        </Box >
    )
}
