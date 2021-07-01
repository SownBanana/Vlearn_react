import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@material-ui/core";
import BreadCrumbs from "commons/components/BreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "features/Course/courseListSlice";
import CourseItemFlat from "features/Course/components/Course/FlatCourseItem";
import { Pagination, Skeleton } from "@material-ui/lab";
import SearchPane from "./SearchPane";
import { CourseStatus, CourseType } from "features/Course/constance";
import useCheckMobile from "commons/hooks/useCheckMobile";
import { clearEditingCourse, setCourseTitle, setCourseType } from "features/Course/editingCourseSlice";
import { Statuses } from "commons/enums/status";

export default function CourseList() {
    console.log("course list");
    const id = useSelector((state) => state.auth.user.id);
    const courseList = useSelector((state) => state.courseList.data);
    const loadStatus = useSelector((state) => state.courseList.status);
    const username = useSelector(state => state.auth.user.username);
    const courses = courseList.data;
    const dispatch = useDispatch();
    const history = useHistory();
    const isMobile = useCheckMobile();
    const [open, setOpen] = useState(false);
    const [courseTitle, setTitle] = useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [nav, setNav] = useState({
        page: 1,
        perPage: 8,
        instructor_id: id,
        search: "",
    });
    const [filter, setFilter] = useState({
        status: CourseStatus.ALL,
        time: "desc",
    });
    const routeChange = () => {
        let path = `/courses/i/${username}/add`;
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
                ...filter,
            })
        );
    }, [dispatch, nav, filter]);

    // useEffect(() => {
    // 	isMobile ? setNav({ ...nav, perPage: 5 }) : setNav({ ...nav, perPage: 8 });
    // }, [isMobile]);

    return (
        <Box mt={2}>
            <BreadCrumbs current="Khóa học của tôi">
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Thêm khóa học
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Tạo khóa học
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Tên khóa học"
                            type="text"
                            fullWidth
                            value={courseTitle}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Box p={2}>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                style={{ marginRight: 20 }}
                                onClick={() => {
                                    dispatch(clearEditingCourse());
                                    dispatch(setCourseTitle(courseTitle));
                                    dispatch(setCourseType(CourseType.NORMAL));
                                    handleClose();
                                    routeChange();
                                }}
                            >
                                Khóa học thông thường
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                onClick={() => {
                                    dispatch(clearEditingCourse());
                                    dispatch(setCourseTitle(courseTitle));
                                    dispatch(setCourseType(CourseType.LIVE));
                                    handleClose();
                                    routeChange();
                                }}
                            >
                                Khóa học trực tuyến
                            </Button>
                        </Box>
                    </DialogActions>
                </Dialog>
            </BreadCrumbs>
            <SearchPane
                handleSearch={handleSearch}
                handleFilter={setFilter}
                filter={filter}
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
                                    Array(2).fill(
                                        <Grid item md={6} xs={12}>
                                            <Box>
                                                <Skeleton variant="rect" width="100%" height={64} />
                                            </Box>
                                        </Grid>
                                    )
                                ) :
                                courses && courses.length ?
                                    courses.map((course) => {
                                        return (
                                            <Grid item md={6} xs={12} key={course.id}>
                                                <CourseItemFlat course={course} />
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
