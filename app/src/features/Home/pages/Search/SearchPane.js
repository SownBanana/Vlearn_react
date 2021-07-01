import { Box, Grid, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumbs from "commons/components/BreadCrumbs";
import UserList from 'commons/components/User/UserList';
import { search as searchAction } from 'features/Home/pages/Search/searchSlice';
import CourseList from 'commons/components/Course/CourseList';

export default function SearchPane({ location }) {
    const dispatch = useDispatch()
    const instructors = useSelector(state => state.search.instructors)
    const students = useSelector(state => state.search.students)
    const courses = useSelector(state => state.search.courses)
    const status = useSelector(state => state.search.status)
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
                    <UserList users={instructors} title={"Giảng viên"} loadStatus={status} />
                </Box>
                <Box mb={5}>
                    <UserList users={students} title={"Học sinh"} loadStatus={status} />
                </Box>
                <CourseList courses={courses} loadStatus={status} />
            </Box>
        </Box >
    )
}
