import React, { useEffect, useState } from 'react';
import {
    Box,
    IconButton,
    makeStyles,
    Typography,
    useTheme,
    Toolbar,
    Chip,
    TextField,
    TableFooter,
    TablePagination,
    TableSortLabel,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { fromTimeString } from 'commons/functions/humanTime';
import { useHistory } from 'react-router';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { fetch, store } from '../../announcementSlice';
import { UserRole } from 'features/Authenticate/constance';
import { Autocomplete } from '@material-ui/lab';
import CKEditor from "commons/components/CKEditor/CKEditor";

const EnhancedTableToolbar = ({
    classes,
    roles,
    setRoles,
    handleSearch,
    fetch
}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [target, setTarget] = useState([])
    const [content, setContent] = useState('')

    const targetOptions = [
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
        UserRole.ALL,
    ]

    const roleOptions = [
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
        'all',
    ]

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <Toolbar
            className={classes.toolbarRoot}
        >
            <Box display="flex">
                <Button
                    style={{ marginRight: 10, width: 'max-content' }}
                    variant="contained" color="primary"
                    size="small"
                    onClick={handleOpen}
                >
                    Thêm Thông báo
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="md"
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Thêm Thông báo
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Tiêu đề"
                            type="text"
                            fullWidth
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                        <Autocomplete
                            multiple
                            size="small"
                            value={target}
                            onChange={(event, newTargets) => {
                                if (newTargets.includes(null))
                                    setTarget([null])
                                else setTarget(newTargets);
                            }}
                            options={targetOptions}
                            getOptionLabel={(option) => {
                                switch (option) {
                                    case UserRole.ALL: return 'Tất cả'
                                    case UserRole.ADMIN: return 'Quản trị viên'
                                    case UserRole.INSTRUCTOR: return 'Giảng viên'
                                    case UserRole.STUDENT: return 'Học sinh'
                                    default: return ''
                                }
                            }}
                            renderTags={(tagValue, getTagProps) =>
                                tagValue.map((option, index) => (
                                    option === UserRole.STUDENT
                                        ? <Chip label="Học sinh" variant="outlined"
                                            classes={{ root: classes.successChip }}
                                            className={classes.actionChip}
                                            size="small"
                                            {...getTagProps({ index })}
                                        />
                                        : option === UserRole.INSTRUCTOR
                                            ? <Chip label="Giảng viên" variant="outlined"
                                                color="primary"
                                                className={classes.actionChip}
                                                size="small"
                                                {...getTagProps({ index })}
                                            />
                                            : option === UserRole.ALL
                                                ? <Chip label="Tất cả" variant="outlined"
                                                    className={classes.actionChip}
                                                    size="small"
                                                    {...getTagProps({ index })}
                                                />
                                                : <Chip label="Quản trị viên" variant="outlined" color="secondary"
                                                    className={classes.actionChip}
                                                    size="small"
                                                    {...getTagProps({ index })}
                                                />
                                ))
                            }
                            style={{ width: 410 }}
                            renderInput={(params) => (
                                <TextField {...params} size="small"
                                    label="Thông báo đến" placeholder="" variant="outlined" />
                            )}
                        />
                        <div className={classes.editor}>
                            <CKEditor
                                isNoSide={true}
                                content={content}
                                handler={setContent}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose}
                            color="secondary"
                            variant="contained"
                        >
                            Thoát
                        </Button>
                        <Button
                            onClick={async () => {
                                await dispatch(
                                    store({ title, target, content })
                                );
                                handleClose();
                                fetch();
                            }}
                            color="primary"
                            variant="contained"
                        >
                            Tạo thông báo
                        </Button>
                    </DialogActions>
                </Dialog>
                <Autocomplete
                    multiple
                    size="small"
                    value={roles}
                    onChange={(event, newRoles) => {
                        setRoles(newRoles);
                    }}
                    options={roleOptions}
                    getOptionLabel={(option) => {
                        switch (option) {
                            case 'all': return 'Tất cả'
                            case UserRole.ADMIN: return 'Quản trị viên'
                            case UserRole.INSTRUCTOR: return 'Giảng viên'
                            case UserRole.STUDENT: return 'Học sinh'
                            default: return ''
                        }
                    }}
                    renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                            option === UserRole.STUDENT
                                ? <Chip label="Học sinh" variant="outlined"
                                    classes={{ root: classes.successChip }}
                                    className={classes.actionChip}
                                    size="small"
                                    {...getTagProps({ index })}
                                />
                                : option === UserRole.INSTRUCTOR
                                    ? <Chip label="Giảng viên" variant="outlined"
                                        color="primary"
                                        className={classes.actionChip}
                                        size="small"
                                        {...getTagProps({ index })}
                                    />
                                    : option === 'all'
                                        ? <Chip label="Tất cả" variant="outlined"
                                            className={classes.actionChip}
                                            size="small"
                                            {...getTagProps({ index })}
                                        />
                                        : <Chip label="Quản trị viên" variant="outlined" color="secondary"
                                            className={classes.actionChip}
                                            size="small"
                                            {...getTagProps({ index })}
                                        />
                        ))
                    }
                    style={{ width: 410 }}
                    renderInput={(params) => (
                        <TextField {...params} size="small"
                            label="Thông báo đến" placeholder="" variant="outlined" />
                    )}
                />
            </Box>
            <Box display="flex" justifyContent="flex-end" width="100%">
                <TextField size="small"
                    label="Tìm kiếm" placeholder="" variant="outlined"
                    onChange={handleSearch}
                />
            </Box>
        </Toolbar >
    );
};

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

function EnhancedTableHead({
    classes,
    order,
    setOrder,
}) {
    const createSortHandler = () => {
        const isAsc = order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="left">Tiêu đề</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="center">Target</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} align="left">
                    <TableSortLabel
                        active
                        direction={order}
                        onClick={createSortHandler}
                    >
                        Thời gian tạo
                        <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </span>
                    </TableSortLabel>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default function ManageAnnouncement() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const announcements = useSelector((state) => state.announcement.announcements);
    const totalAnnouncements = useSelector((state) => state.announcement.totalAnnouncements);
    const [roles, setRoles] = useState([])
    const [order, setOrder] = useState('desc')
    const [nav, setNav] = useState({
        page: 1,
        perPage: 5,
        search: "",
    });
    const history = useHistory();
    const perPageOptions = [
        3, 5, 10, 25, 50, 100
    ]
    const openAnnouncement = id => {
        history.push(`/announcements/${id}`)
    }

    var queryTimeOut = 0;
    const handleSearch = (e) => {
        clearTimeout(queryTimeOut);
        queryTimeOut = setTimeout(() => {
            setNav({ ...nav, search: e.target.value });
        }, 300);
    };

    const handleFilterRole = (role) => {
        const rolesIndex = roles.indexOf(role);
        let newRoles = [];

        if (rolesIndex === -1) {
            newRoles = newRoles.concat(roles, role);
        } else if (rolesIndex === 0) {
            newRoles = newRoles.concat(roles.slice(1));
        } else if (rolesIndex === roles.length - 1) {
            newRoles = newRoles.concat(roles.slice(0, -1));
        } else if (rolesIndex > 0) {
            newRoles = newRoles.concat(
                roles.slice(0, rolesIndex),
                roles.slice(rolesIndex + 1),
            );
        }
        setRoles(newRoles);
    }

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

    const fetchUser = () => {
        dispatch(fetch({
            ...nav,
            targets: roles,
            order,
        }));
    }

    useEffect(() => {
        fetchUser();
    }, [dispatch, nav, roles, order]);

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
                    roles={roles}
                    setRoles={setRoles}
                    handleSearch={handleSearch}
                    fetch={fetchUser}
                />
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            setOrder={setOrder}
                        />
                        <TableBody>
                            {announcements && announcements.map((announcement) => (
                                <TableRow key={announcement.id}>
                                    <TableCell component="th" scope="row">
                                        {announcement.id}
                                    </TableCell>
                                    <TableCell
                                        className={classes.userCell}
                                        align="left"
                                        onClick={() => openAnnouncement(announcement.id)}
                                    >
                                        <Typography style={{ verticalAlign: "middle" }} variant="body2" color="initial">{announcement.title}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        {
                                            announcement.target?.includes(UserRole.STUDENT)
                                            && <Chip label="Học sinh" variant="outlined"
                                                classes={{ root: classes.successChip }}
                                                className={classes.actionChip}
                                                size="small"
                                                onClick={() => handleFilterRole(UserRole.STUDENT)}
                                            />
                                        }
                                        {
                                            announcement.target?.includes(UserRole.INSTRUCTOR) &&
                                            <Chip label="Giảng viên" variant="outlined"
                                                color="primary"
                                                className={classes.actionChip}
                                                size="small"
                                                onClick={() => handleFilterRole(UserRole.INSTRUCTOR)}
                                            />
                                        }
                                        {announcement.target?.includes(UserRole.ADMIN) &&
                                            < Chip label="Quản trị viên" variant="outlined" color="secondary"
                                                className={classes.actionChip}
                                                size="small"
                                                onClick={() => handleFilterRole(UserRole.ADMIN)}
                                            />
                                        }
                                        {!announcement.target &&
                                            < Chip label="Tất cả" variant="outlined"
                                                className={classes.actionChip}
                                                size="small"
                                                onClick={() => handleFilterRole(UserRole.ADMIN)}
                                            />
                                        }
                                    </TableCell>
                                    <TableCell align="left">{fromTimeString(announcement.created_at)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={perPageOptions}
                                    count={totalAnnouncements}
                                    rowsPerPage={nav.perPage}
                                    page={nav.page - 1}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'Thông báo mỗi trang:' },
                                        native: true,
                                    }}
                                    labelRowsPerPage={'Số thông báo mỗi trang:'}
                                    labelDisplayedRows={
                                        ({ from, to, count }) => `${from}-${to} trên ${count !== -1 ? `của ${count} thông báo` : `hơn ${to} thông báo`}`
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
    userCell: {
        cursor: "pointer",
        // display: "flex",
        alignItems: "center",
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
    successChip: {
        color: theme.palette.success.main,
        borderColor: theme.palette.success.main,
    },
    actionChip: {
        cursor: 'pointer',
        transition: '0.2s',
        marginRight: 3,
        '&:hover': {
            backgroundColor: 'aliceblue',
            transform: 'scale(1.1)'
        }
    },
}))