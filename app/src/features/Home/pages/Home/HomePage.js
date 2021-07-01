import { UserRole } from 'features/Authenticate/constance'
import React from 'react'
import {
    Box,
} from '@material-ui/core';
import { useEffect } from 'react'
import { Redirect } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecommendCourses, fetchRecentCourses } from 'features/Home/homeSlice';
import useCheckMobile from 'commons/hooks/useCheckMobile';
import CourseList from 'commons/components/Course/CourseList';
import Slide from 'commons/components/Carousel/Slice';

export default function HomePage() {
    const id = useSelector(state => state.auth.user.id)
    const role = useSelector(state => state.auth.user.role)
    const dispatch = useDispatch()
    const recommendStatus = useSelector(state => state.home.recommendStatus)
    const recommendCourses = useSelector(state => state.home.recommendCourses)
    const recentStatus = useSelector(state => state.home.recentStatus)
    const recentCourses = useSelector(state => state.home.recentCourses)
    const isMobile = useCheckMobile()
    useEffect(() => {
        dispatch(fetchRecommendCourses(id))
        dispatch(fetchRecentCourses())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return role === null || role === UserRole.STUDENT ?
        (
            <>
                <Box>
                    <Slide height={isMobile ? "50vh" : "45vh"} />
                </Box>
                <Box px={isMobile ? 2 : 5}>
                    {
                        role &&
                        <CourseList title="Khóa học gần đây" courses={recentCourses} loadStatus={recentStatus} />
                    }
                    <CourseList title="Khóa học dành cho bạn" courses={recommendCourses} loadStatus={recommendStatus} />
                </Box>
            </>
        )
        : (
            <Redirect to="/dashboard" />
        )
}
