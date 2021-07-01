import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Grid, useMediaQuery, Typography } from "@material-ui/core";
import BreadCrumbs from "commons/components/BreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "features/Course/courseListSlice";
import CourseItem from "features/Course/components/Course/CourseItem";
import { Pagination, Skeleton } from "@material-ui/lab";
import SearchPane from "features/Course/pages/Student/CourseList/SearchPane";
import { Statuses } from "commons/enums/status";
export default function CourseList() {
    console.log("course list");
    const courseList = useSelector((state) => state.courseList.data);
    const loadStatus = useSelector((state) => state.courseList.status);
    const courses = courseList.data;
    const dispatch = useDispatch();
    const history = useHistory();
    const isMobile = useMediaQuery("(max-width: 760px)");
    const [nav, setNav] = useState({
        page: 1,
        perPage: 12,
        search: "",
    });
    const [sort, setSort] = useState({
        orderBy: 'updated_at',
        order: "desc",
    });
    const routeChange = () => {
        let path = `/courses/add`;
        history.push(path);
    };
    const setPage = (e, value) => {
        e.preventDefault();
        setNav({ ...nav, page: value });
        window.scrollTo(0, 0);
    };

    var queryTimeOut = 0;
    const handleSearch = (e) => {
        clearTimeout(queryTimeOut);
        queryTimeOut = setTimeout(() => {
            setNav({ ...nav, search: e.target.value });
        }, 300);
    };

    useEffect(() => {
        dispatch(
            fetchCourses({
                ...nav,
                ...sort,
            })
        );
    }, [dispatch, nav, sort]);
    // useEffect(() => {
    //     isMobile ? setNav({ ...nav, perPage: 5 }) : setNav({ ...nav, perPage: 12 });
    // }, [isMobile]);

    return (
        <Box mt={2}>
            <BreadCrumbs current="Khóa học">

            </BreadCrumbs>
            <SearchPane
                handleSearch={handleSearch}
                handleSort={setSort}
                sort={sort}
            />
            <Box px={isMobile ? 2 : 5}>
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                    wrap="nowrap"
                >
                    <Grid
                        item
                        md={12}
                        xl={10}
                        container
                        spacing={4}
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        alignContent="center"
                    >
                        {
                            loadStatus === Statuses.WAITING || loadStatus === Statuses.LOADING ?
                                (
                                    Array(4).fill(
                                        <Grid item md={3} sm={4} xs={12}>
                                            <Box>
                                                <Skeleton variant="rect" width="100%" height={200} />
                                                <Skeleton />
                                                <Skeleton width="60%" />
                                            </Box>
                                        </Grid>
                                    )
                                ) :
                                courses && courses.length ?
                                    courses.map((course) => {
                                        return (
                                            <Grid item md={3} sm={4} xs={12} key={course.id} >
                                                <Box>
                                                    <CourseItem course={course} />
                                                </Box>
                                            </Grid>
                                        );
                                    }) :
                                    <Typography style={{ margin: "auto" }} variant="subtitle2" color="textSecondary">Không có dữ liệu</Typography>
                        }
                    </Grid>
                </Grid>
            </Box>
            <Box mt={4} mb={3} style={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                    count={courseList.last_page}
                    shape="rounded"
                    color="primary"
                    onChange={setPage}
                    page={courseList.current_page}
                />
            </Box>
        </Box>
    );
}
