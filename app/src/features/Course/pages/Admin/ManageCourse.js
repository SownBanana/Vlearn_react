import React, { useEffect, useState } from 'react';
import { Avatar, Box, IconButton, makeStyles, TableFooter, TablePagination, Typography, useTheme } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { fetchCourses } from 'features/Course/courseListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fromTimeString } from 'commons/functions/humanTime';
import { useHistory } from 'react-router';
import { CourseStatus, CourseType } from 'features/Course/constance';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

export default function ManageCourse() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const courseList = useSelector((state) => state.courseList.data);
    const courses = courseList.data;
    const [nav, setNav] = useState({
        page: 1,
        perPage: 12,
        search: "",
    });
    const history = useHistory();

    const openInstructorProfile = id => {
        history.push(`/info/${id}`)
    }
    const setPage = (e, value) => {
        e.preventDefault();
        setNav({ ...nav, page: value });
        window.scrollTo(0, 0);
    };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };
    useEffect(() => {
        dispatch(
            fetchCourses({
                ...nav
            })
        );
    }, [dispatch]);
    return (
        <Box mx={{ xs: 0, sm: 0 }} my={{ xs: 1, sm: 2 }} className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên khóa học</TableCell>
                            <TableCell align="center">Loại khóa học</TableCell>
                            <TableCell align="center">Tình trạng</TableCell>
                            <TableCell align="left">Giảng viên</TableCell>
                            <TableCell align="left">Thời gian chỉnh sửa</TableCell>
                            <TableCell align="left">Thời gian tạo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.title}>
                                <TableCell component="th" scope="row">
                                    {course.title}
                                </TableCell>
                                <TableCell align="center">{course.type === CourseType.LIVE ? "Trực tuyến" : "Thông thường"}</TableCell>
                                <TableCell align="center">{course.status === CourseStatus.PUBLISH ? "Đã xuất bản" : "Bản nháp"}</TableCell>
                                <TableCell
                                    className={classes.instructorCell}
                                    align="left"
                                    onClick={() => openInstructorProfile(course.instructor_id)}
                                >
                                    <Avatar className="avatar--small" alt={course.instructor.username} src={course.instructor.avatar_url} />
                                    <Typography style={{ verticalAlign: "middle", marginLeft: 5 }} variant="body2" color="initial">{course.instructor.name}</Typography>
                                </TableCell>
                                <TableCell align="left">{fromTimeString(course.updated_at)}</TableCell>
                                <TableCell align="left">{fromTimeString(course.created_at)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={nav.perPage}
                                colSpan={3}
                                count={courses.length}
                                rowsPerPage={nav.perPage}
                                page={nav.page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={setPage}
                                // onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    );
}
const useStyles = makeStyles(theme => ({
    instructorCell: {
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        "&:hover": {
            color: theme.palette.primary.main,
            textDecoration: "underline",
        }
    }
}))

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div style={{
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}
