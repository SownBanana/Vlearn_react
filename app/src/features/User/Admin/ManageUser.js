import React, { useEffect, useState } from 'react';
import {
    Avatar,
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
    Switch,
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
import { fetch, verify, createAdmin } from '../userSlice';
import { UserRole } from 'features/Authenticate/constance';
import { Autocomplete } from '@material-ui/lab';

const EnhancedTableToolbar = ({
    classes,
    status,
    setStatus,
    roles,
    setRoles,
    handleSearch,
    fetch
}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const roleOptions = [
        UserRole.ADMIN,
        UserRole.INSTRUCTOR,
        UserRole.STUDENT,
    ]
    const statusOptions = [
        {
            title: 'Đã kích hoạt',
            code: 'active'
        },
        {
            title: 'Chưa kích hoạt',
            code: 'inactive'
        },
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
                    Thêm Quản trị viên
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Thêm Quản trị viên
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Tên quản trị viên"
                            type="text"
                            fullWidth
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose}
                            color="primary"
                        >
                            Thoát
                        </Button>
                        <Button
                            onClick={async () => {
                                await dispatch(
                                    createAdmin({
                                        name, username, email, password
                                    })
                                );
                                handleClose();
                                fetch();
                            }}
                            color="primary"
                        >
                            Tạo tài khoản
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
                            label="Vai trò" placeholder="" variant="outlined" />
                    )}
                />
                <Autocomplete
                    size="small"
                    value={status}
                    onChange={(event, newStatus) => {
                        console.log(newStatus);
                        if (newStatus) setStatus(newStatus.code);
                        else setStatus('');
                    }}
                    options={statusOptions}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 200 }}
                    renderInput={(params) => (
                        <TextField {...params} size="small"
                            label="Trạng thái" placeholder="" variant="outlined" />
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
                <TableCell>ID</TableCell>
                <TableCell align="center">Avatar</TableCell>
                <TableCell align="left">Tên người dùng</TableCell>
                <TableCell align="center">Tên tài khoản</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="center">Vai trò</TableCell>
                <TableCell align="center">Kích hoạt</TableCell>
                <TableCell align="left">
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

export default function ManageUser() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const totalUsers = useSelector((state) => state.user.totalUsers);
    const [roles, setRoles] = useState([])
    const [status, setStatus] = useState()
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
    const openUserProfile = id => {
        history.push(`/info/${id}`)
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
            roles,
            status,
            order,
        }));
    }

    useEffect(() => {
        fetchUser();
    }, [dispatch, nav, status, roles, order]);

    const handleStatusSwitch = async (id, status) => {
        await dispatch(verify({ id, status }))
        fetchUser()
    }

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
                    status={status}
                    setStatus={setStatus}
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
                            {users && users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell component="th" scope="row">
                                        {user.id}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        onClick={() => openUserProfile(user.id)}
                                    >
                                        <Avatar style={{ margin: "auto" }} className="" alt={user.username} src={user.avatar_url} />
                                    </TableCell>
                                    <TableCell
                                        className={classes.userCell}
                                        align="left"
                                        onClick={() => openUserProfile(user.id)}
                                    >
                                        <Typography style={{ verticalAlign: "middle", marginLeft: 5 }} variant="body2" color="initial">{user.name}</Typography>
                                    </TableCell>
                                    <TableCell align="center">{user.username}</TableCell>
                                    <TableCell align="left">{user.email}</TableCell>
                                    <TableCell align="center">
                                        {
                                            user.role === UserRole.STUDENT
                                                ? <Chip label="Học sinh" variant="outlined"
                                                    classes={{ root: classes.successChip }}
                                                    className={classes.actionChip}
                                                    size="small"
                                                    onClick={() => handleFilterRole(UserRole.STUDENT)}
                                                />
                                                : user.role === UserRole.INSTRUCTOR
                                                    ? <Chip label="Giảng viên" variant="outlined"
                                                        color="primary"
                                                        className={classes.actionChip}
                                                        size="small"
                                                        onClick={() => handleFilterRole(UserRole.INSTRUCTOR)}
                                                    />
                                                    : <Chip label="Quản trị viên" variant="outlined" color="secondary"
                                                        className={classes.actionChip}
                                                        size="small"
                                                        onClick={() => handleFilterRole(UserRole.ADMIN)}
                                                    />
                                        }
                                    </TableCell>
                                    <TableCell align="center">
                                        <Switch
                                            checked={user.email_verified_at !== null}
                                            onChange={() => handleStatusSwitch(user.id, !user.email_verified_at)}
                                            name="checkedB"
                                            color="primary"
                                        />

                                    </TableCell>
                                    <TableCell align="left">{fromTimeString(user.created_at)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={perPageOptions}
                                    count={totalUsers}
                                    rowsPerPage={nav.perPage}
                                    page={nav.page - 1}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'Người dùng mỗi trang:' },
                                        native: true,
                                    }}
                                    labelRowsPerPage={'Số người dùng mỗi trang:'}
                                    labelDisplayedRows={
                                        ({ from, to, count }) => `${from}-${to} trên ${count !== -1 ? `của ${count} người dùng` : `hơn ${to} người dùng`}`
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
        '&:hover': {
            backgroundColor: 'aliceblue',
            transform: 'scale(1.1)'
        }
    },
}))