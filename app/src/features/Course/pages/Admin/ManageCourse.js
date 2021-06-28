import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    IconButton,
    makeStyles,
    TableFooter,
    TablePagination,
    Typography,
    useTheme,
    Checkbox,
    TableSortLabel,
    Toolbar,
    Button,
    Chip,
    TextField,
    lighten,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Switch,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { fetchCourses, fetchInstructors } from 'features/Course/courseListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fromTimeString } from 'commons/functions/humanTime';
import { useHistory } from 'react-router';
import { CourseStatus, CourseType } from 'features/Course/constance';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import clsx from 'clsx';
import api from "commons/api/course/resource";
import CKEditor from "commons/components/CKEditor/CKEditor";

const EnhancedTableToolbar = ({
    classes,
    numSelected,
    updateStatus,
    statuses,
    setStatuses,
    types,
    setTypes,
    handleSearch,
    instructors,
    instructor_id,
    setInstructorId,
}) => {
    const [open, setOpen] = useState(false)
    const [reason, setReason] = useState('')
    const courseStatuses = [
        CourseStatus.REJECTED,
        CourseStatus.DRAFT,
        CourseStatus.REVIEWING,
        CourseStatus.PUBLISH,
    ]
    const courseTypes = [
        CourseType.LIVE,
        CourseType.NORMAL
    ]

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <Toolbar
            className={clsx(classes.toolbarRoot, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} được chọn
                </Typography>
            ) : (
                <Box display="flex">
                    <Autocomplete
                        multiple
                        size="small"
                        value={statuses}
                        onChange={(event, newStatuses) => {
                            setStatuses(newStatuses);
                        }}
                        options={courseStatuses}
                        getOptionLabel={(option) => {
                            switch (option) {
                                case CourseStatus.REJECTED: return 'Từ chối'
                                case CourseStatus.DRAFT: return 'Nháp'
                                case CourseStatus.PUBLISH: return 'Xuất bản'
                                case CourseStatus.REVIEWING: return 'Đợi duyệt'
                                default: return ''
                            }
                        }}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                                option === CourseStatus.PUBLISH
                                    ? <Chip label="Đã xuất bản" variant="outlined"
                                        classes={{ root: classes.successChip }}
                                        className={classes.actionChip}
                                        size="small"
                                        {...getTagProps({ index })}
                                    />
                                    : option === CourseStatus.REVIEWING
                                        ? <Chip label="Đang đợi duyệt" variant="outlined"
                                            color="primary"
                                            className={classes.actionChip}
                                            size="small"
                                            {...getTagProps({ index })}
                                        />
                                        : option === CourseStatus.REJECTED
                                            ? <Chip label="Từ chối" variant="outlined" color="secondary"
                                                className={classes.actionChip}
                                                size="small"
                                                {...getTagProps({ index })}
                                            />
                                            : <Chip label="Bản nháp" variant="outlined"
                                                classes={{ root: classes.warningChip }}
                                                className={classes.actionChip}
                                                size="small"
                                                {...getTagProps({ index })}
                                            />
                            ))
                        }
                        style={{ width: 435 }}
                        renderInput={(params) => (
                            <TextField {...params} size="small"
                                label="Tình trạng" placeholder="" variant="outlined" />
                        )}
                    />
                    <Autocomplete
                        multiple
                        size="small"
                        value={types}
                        onChange={(event, newTypes) => {
                            setTypes(newTypes);
                        }}
                        options={courseTypes}
                        getOptionLabel={(option) => {
                            switch (option) {
                                case CourseType.LIVE: return 'Trực tuyến'
                                case CourseType.NORMAL: return 'Thông thường'
                                default: return ''
                            }
                        }}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                                option === CourseType.LIVE ?
                                    <Chip label="Trực tuyến"
                                        color="secondary"
                                        clickable
                                        size="small"
                                        {...getTagProps({ index })}
                                    /> :
                                    <Chip label="Thông thường"
                                        color="primary"
                                        clickable
                                        size="small"
                                        {...getTagProps({ index })}
                                    />
                            ))
                        }
                        style={{ width: 330 }}
                        renderInput={(params) => (
                            <TextField {...params} size="small"
                                label="Loại khóa học" placeholder="" variant="outlined" />
                        )}
                    />
                    <Autocomplete
                        size="small"
                        value={instructor_id}
                        onChange={(event, newInstructor) => {
                            if (newInstructor) setInstructorId(newInstructor.id);
                            else setInstructorId('');
                        }}
                        options={instructors}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 200 }}
                        renderInput={(params) => (
                            <TextField {...params} size="small"
                                label="Giảng viên" placeholder="" variant="outlined" />
                        )}
                    />
                </Box>
            )}

            {numSelected > 0 ?
                <div style={{
                    display: "flex",
                    width: '100%',
                    justifyContent: 'flex-end',
                }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.actionBtn}
                        onClick={handleOpen}
                    >
                        Từ chối
                    </Button>
                    <Dialog
                        fullWidth
                        maxWidth="md"
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">
                            Từ chối khóa học
                        </DialogTitle>
                        <DialogContent>
                            <div className={classes.editor}>
                                <CKEditor
                                    isNoSide={true}
                                    content={reason}
                                    handler={setReason}
                                />
                            </div>
                            {/* <TextField
                                autoFocus
                                multiline
                                variant="outlined"
                                margin="dense"
                                id="content"
                                label="Lý do"
                                type="text"
                                fullWidth
                                value={reason}
                                onChange={(e) => {
                                    setReason(e.target.value);
                                }}
                            /> */}
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleClose}
                                color="primary"
                                variant="contained"
                            >
                                Thoát
                            </Button>
                            <Button
                                onClick={() => {
                                    updateStatus(CourseStatus.REJECTED, reason)
                                    handleClose();
                                }}
                                color="secondary"
                                variant="outlined"
                            >
                                Xác nhận từ chối
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Button
                        variant="contained"
                        classes={{ root: classes.warningBtn }}
                        className={classes.actionBtn}
                        onClick={() => updateStatus(CourseStatus.DRAFT)}
                    >
                        Nháp
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.actionBtn}
                        onClick={() => updateStatus(CourseStatus.REVIEWING)}
                    >
                        Đợi duyệt
                    </Button>
                    <Button
                        variant="contained"
                        classes={{ root: classes.successBtn }}
                        onClick={() => updateStatus(CourseStatus.PUBLISH)}
                    >
                        Xuất bản
                    </Button>
                </div>
                :
                <div style={{
                    display: "flex",
                    width: '100%',
                    justifyContent: 'flex-end',
                }}>
                    <TextField size="small"
                        label="Tìm kiếm" placeholder="" variant="outlined"
                        onChange={handleSearch}
                    />
                </div>
            }
        </Toolbar >
    );
};

function EnhancedTableHead({
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
}) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow >
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="center">Tình trạng</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Tên khóa học</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="center">Loại khóa học</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="left">Giảng viên</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="left">Editor's choice</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="left">
                    <TableSortLabel
                        active={orderBy === 'updated_at'}
                        direction={orderBy === 'updated_at' ? order : 'asc'}
                        onClick={createSortHandler('updated_at')}
                    >
                        Thời gian chỉnh sửa
                        {orderBy === 'updated' ? (
                            <span className={classes.visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="left">
                    <TableSortLabel
                        active={orderBy === 'created_at'}
                        direction={orderBy === 'created_at' ? order : 'asc'}
                        onClick={createSortHandler('created_at')}
                    >
                        Thời gian tạo
                        {orderBy === 'created_at' ? (
                            <span className={classes.visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

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

export default function ManageCourse() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const instructors = useSelector((state) => state.courseList.instructors);
    const courseList = useSelector((state) => state.courseList.data);
    const courses = courseList.data;

    const [selected, setSelected] = useState([]);

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('updated_at');
    const [statuses, setStatuses] = useState([]);
    const [types, setTypes] = useState([]);
    const [instructor_id, setInstructorId] = useState('');

    const [nav, setNav] = useState({
        page: 1,
        perPage: 5,
        search: "",
    });
    const perPageOptions = [
        3, 5, 10, 25, 50, 100
    ]

    var queryTimeOut = 0;
    const handleSearch = (e) => {
        clearTimeout(queryTimeOut);
        queryTimeOut = setTimeout(() => {
            setNav({ ...nav, search: e.target.value });
        }, 300);
    };

    const handleFilterStatus = (status) => {
        const statusesIndex = statuses.indexOf(status);
        let newStatuses = [];

        if (statusesIndex === -1) {
            newStatuses = newStatuses.concat(statuses, status);
        } else if (statusesIndex === 0) {
            newStatuses = newStatuses.concat(statuses.slice(1));
        } else if (statusesIndex === statuses.length - 1) {
            newStatuses = newStatuses.concat(statuses.slice(0, -1));
        } else if (statusesIndex > 0) {
            newStatuses = newStatuses.concat(
                statuses.slice(0, statusesIndex),
                statuses.slice(statusesIndex + 1),
            );
        }
        setStatuses(newStatuses);
    }
    const handleFilterType = (type) => {
        const typeIndex = types.indexOf(type);
        let newTypes = [];

        if (typeIndex === -1) {
            newTypes = newTypes.concat(types, type);
        } else if (typeIndex === 0) {
            newTypes = newTypes.concat(types.slice(1));
        } else if (typeIndex === types.length - 1) {
            newTypes = newTypes.concat(types.slice(0, -1));
        } else if (typeIndex > 0) {
            newTypes = newTypes.concat(
                types.slice(0, typeIndex),
                types.slice(typeIndex + 1),
            );
        }
        setTypes(newTypes);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = courses.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleSelect = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const updateStatus = async (status, reason = '') => {
        await api.setStatus({
            ids: selected,
            status,
            reason
        })
        fetch()
    }
    const updateEditorChoice = async (id, choice) => {
        await api.setEditorChoice({
            id,
            choice
        })
        fetch()
    }

    const openInstructorProfile = id => {
        history.push(`/info/${id}`)
    }
    const previewCourses = id => {
        history.push(`/courses/a/preview/${id}`)
    }
    const isSelected = (id) => selected.indexOf(id) !== -1;

    const setPage = (e, value) => {
        e.preventDefault();
        setNav({ ...nav, page: value + 1 });
        window.scrollTo(0, 0);
    };
    const setRowPerPage = (e) => {
        e.preventDefault();
        setNav({ ...nav, perPage: parseInt(e.target.value, 10) });
        window.scrollTo(0, 0);
    };

    const fetch = () => {
        dispatch(
            fetchCourses({
                ...nav,
                statuses,
                types,
                orderBy,
                order,
                instructor_id
            })
        );
    }
    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };
    useEffect(() => {
        fetch()
    }, [dispatch, orderBy, order, statuses, types, nav, instructor_id]);

    useEffect(() => {
        dispatch(fetchInstructors());
    }, [dispatch])

    return (
        <Box
            mx={{ xs: 0, sm: 0 }}
            mt={{ xs: 1, sm: 2 }}
            mb={{ xs: 1, sm: 10 }}
            className={classes.root}
        >
            <Paper>
                <EnhancedTableToolbar
                    classes={classes}
                    numSelected={selected.length}
                    updateStatus={updateStatus}
                    statuses={statuses}
                    setStatuses={setStatuses}
                    types={types}
                    setTypes={setTypes}
                    handleSearch={handleSearch}
                    instructors={instructors}
                    instructor={instructor_id}
                    setInstructorId={setInstructorId}
                />
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <EnhancedTableHead
                            classes={classes}
                            onSelectAllClick={handleSelectAllClick}
                            order={order}
                            orderBy={orderBy}
                            numSelected={selected.length}
                            rowCount={courses.length}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {courses.map((course, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;
                                const isCourseSelected = isSelected(course.id);
                                return (
                                    <TableRow
                                        key={course.title}
                                        hover
                                        onClick={(event) => handleSelect(event, course.id)}
                                        role="checkbox"
                                        aria-checked={isCourseSelected}
                                        tabIndex={-1}
                                        selected={isCourseSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isCourseSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{
                                            course.status === CourseStatus.PUBLISH
                                                ? <Chip label="Đã xuất bản" variant="outlined"
                                                    classes={{ root: classes.successChip }}
                                                    className={classes.actionChip}
                                                    clickable
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleFilterStatus(CourseStatus.PUBLISH)
                                                    }}
                                                />
                                                : course.status === CourseStatus.REVIEWING
                                                    ? <Chip label="Đang đợi duyệt" variant="outlined"
                                                        color="primary"
                                                        className={classes.actionChip}
                                                        clickable
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleFilterStatus(CourseStatus.REVIEWING)
                                                        }}
                                                    />
                                                    : course.status === CourseStatus.REJECTED
                                                        ? <Chip label="Từ chối" variant="outlined" color="secondary"
                                                            size="small"
                                                            clickable
                                                            className={classes.actionChip}
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleFilterStatus(CourseStatus.REJECTED)
                                                            }}
                                                        />
                                                        : <Chip label="Bản nháp" variant="outlined"
                                                            size="small"
                                                            classes={{ root: classes.warningChip }}
                                                            clickable
                                                            className={classes.actionChip}
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleFilterStatus(CourseStatus.DRAFT)
                                                            }}
                                                        />
                                        }</TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            className={classes.courseCell}
                                            onClick={() => previewCourses(course.id)}
                                        >
                                            {course.title}
                                        </TableCell>
                                        <TableCell align="center">{
                                            course.type === CourseType.LIVE ?
                                                <Chip label="Trực tuyến"
                                                    color="secondary"
                                                    className={classes.actionChipType}
                                                    clickable
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleFilterType(CourseType.LIVE)
                                                    }}
                                                /> :
                                                <Chip label="Thông thường"
                                                    color="primary"
                                                    className={classes.actionChipType}
                                                    clickable
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleFilterType(CourseType.NORMAL)
                                                    }}
                                                />
                                        }</TableCell>
                                        <TableCell
                                            className={classes.instructorCell}
                                            align="left"
                                            onClick={() => openInstructorProfile(course.instructor_id)}
                                        >
                                            <Avatar className="avatar--small" alt={course.instructor.username} src={course.instructor.avatar_url} />
                                            <Typography style={{ verticalAlign: "middle", marginLeft: 5 }} variant="body2" color="initial">{course.instructor.name}</Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Switch
                                                checked={course.is_editor_choice}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    updateEditorChoice(course.id, !course.is_editor_choice)
                                                }}
                                                name="checkedB"
                                                color="primary"
                                            />

                                        </TableCell>
                                        <TableCell align="left">{fromTimeString(course.updated_at)}</TableCell>
                                        <TableCell align="left">{fromTimeString(course.created_at)}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={perPageOptions}
                                    count={courseList.total}
                                    rowsPerPage={nav.perPage}
                                    page={nav.page - 1}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    labelRowsPerPage={'Số khóa học mỗi trang:'}
                                    labelDisplayedRows={
                                        ({ from, to, count }) => `${from}-${to} của tổng ${count !== -1 ? `${count} khóa học` : `hơn ${to} khóa học`}`
                                    }
                                    onChangePage={setPage}
                                    onChangeRowsPerPage={setRowPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
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
    },
    courseCell: {
        cursor: "pointer",
        "&:hover": {
            color: theme.palette.primary.main,
            textDecoration: "underline",
        }
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },

    toolbarRoot: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(5),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
        textAlign: 'left'
    },
    actionBtn: {
        marginRight: 10
    },
    successBtn: {
        color: "white",
        backgroundColor: theme.palette.success.main,
    },
    warningBtn: {
        color: "white",
        backgroundColor: theme.palette.warning.main,
    },
    successChip: {
        color: theme.palette.success.main,
        borderColor: theme.palette.success.main,
    },
    warningChip: {
        color: theme.palette.warning.main,
        borderColor: theme.palette.warning.main,
    },
    actionChip: {
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': {
            backgroundColor: 'aliceblue',
            transform: 'scale(1.1)'
        }
    },
    actionChipType: {
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': {
            transform: 'scale(1.1)'
        }
    }
}))
