import {
    Avatar,
    Box,
    IconButton,
    ListItem,
    Paper,
    Typography,
    Button,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    AppBar,
    Toolbar,
    Slide,
    makeStyles,
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core'
import { Close, Lock, LockOpen, PanTool } from '@material-ui/icons';
import { fromTimeString } from 'commons/functions/humanTime';
import useCheckMobile from 'commons/hooks/useCheckMobile';
import { UserRole } from 'features/Authenticate/constance';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { drawAllPermission, setPermission } from '../learnSlice';

export default function StudentList({ channel }) {
    const classes = useStyles();
    const students = useSelector(state => state.learnCourse.course.students);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const isMobile = useCheckMobile();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box height={{ xs: "69vh", md: "50vh" }} px={{ xs: 0, md: 10 }} style={{ overflowY: 'scroll' }}>
            <Paper>
                <Box display="flex" width="100%" p={2} justifyContent="flex-end">
                    {
                        user.role === UserRole.INSTRUCTOR &&
                        <Button variant="contained" color="secondary" size="small"
                            onClick={(e) => {
                                dispatch(drawAllPermission())
                                channel.trigger('client-live-permission', { id: 0, permission: false })
                            }}>
                            Thu hồi tất cả
                        </Button>
                    }
                </Box>
                <Divider />
                {
                    students.map(student => {
                        return (
                            <ListItem
                                key={`student-${student.id}`}
                                button
                                onClick={() => {
                                    setSelectedStudent(student);
                                    handleClickOpen();
                                }}
                            >
                                <Box display="flex" justifyContent="space-between" width="100%">
                                    <Box display="flex">
                                        <Avatar className="avatar--small" alt={student.name} src={student.avatar_url} style={{ marginRight: 10 }} />
                                        <Typography variant="body2" color="initial">{student.name}</Typography>
                                    </Box>
                                    <Box display="flex">
                                        {
                                            student.raise &&
                                            <PanTool style={{ color: "orange" }} />
                                        }
                                        {
                                            student.permission && user.role === UserRole.INSTRUCTOR ?
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        dispatch(setPermission({ id: student.id, permission: false }))
                                                        channel.trigger('client-live-permission', { id: student.id, permission: false })
                                                    }}
                                                >
                                                    <LockOpen color="action" fontSize="small" />
                                                </IconButton>
                                                :
                                                user.role === UserRole.INSTRUCTOR ?
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            dispatch(setPermission({ id: student.id, permission: true }))
                                                            channel.trigger('client-live-permission', { id: student.id, permission: true })
                                                        }}
                                                    >
                                                        <Lock color="action" fontSize="small" />
                                                    </IconButton> : <span></span>
                                        }
                                    </Box>
                                </Box>
                            </ListItem>
                        )
                    })
                }
            </Paper>
            <Dialog fullWidth maxWidth="md" fullScreen={isMobile} open={open} onClose={handleClose} aria-labelledby="student-detail" TransitionComponent={Transition}>
                {
                    isMobile ?
                        <AppBar>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                    <Close />
                                </IconButton>
                                <Typography variant="h6" >
                                    Thông tin học sinh
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        :
                        <DialogTitle id="student-detail">Thông tin học sinh</DialogTitle>
                }
                <DialogContent>
                    {
                        selectedStudent &&
                        <Grid container spacing={1} direction={isMobile ? "column" : "row"}>
                            <Grid xs={12} sm={3} item>
                                <Box mt={{ xs: 8, sm: 0 }}>
                                    <Box display="flex" justifyContent="center">
                                        <div className={classes.avatarContainer}>
                                            <Avatar className={classes.loadedImage} src={selectedStudent.avatar_url} alt={selectedStudent.name} />
                                        </div>
                                    </Box>
                                    <Box display="flex" justifyContent={{ xs: "center", sm: "flex-start" }}>
                                        <Grid container direction="column" justify="center">
                                            <Typography align="center" variant="h5" color="initial">{selectedStudent.name}</Typography>
                                            <Typography align="center" variant="body2" color="textSecondary">@{selectedStudent.username}</Typography>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={9} >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ fontWeight: "bold" }}> Chương</TableCell>
                                            <TableCell style={{ fontWeight: "bold" }} align="left">Thời gian kiểm tra</TableCell>
                                            <TableCell style={{ fontWeight: "bold" }} align="center">Điểm</TableCell>
                                            <TableCell style={{ fontWeight: "bold" }} align="center">Trạng thái</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            selectedStudent.sections.map(section => {
                                                if (section.questions_count > 0)
                                                    return (
                                                        <TableRow key={section.id}>
                                                            <TableCell component="th" scope="row">
                                                                {section.name}
                                                            </TableCell>
                                                            <TableCell align="left">{fromTimeString(section.pivot.last_test, "Chưa làm bài")}</TableCell>
                                                            <TableCell align="center">{section.pivot.last_test !== null ? section.pivot.highest_point : ''}</TableCell>
                                                            {
                                                                section.pivot.last_test === null ?
                                                                    <TableCell /> :
                                                                    section.pivot.highest_point >= section.pass_point ?
                                                                        <TableCell style={{ color: "green" }} align="center">Qua</TableCell> :
                                                                        <TableCell style={{ color: "red" }} align="center">Chưa qua</TableCell>
                                                            }
                                                        </TableRow>
                                                    )
                                            })
                                        }
                                    </TableBody>
                                </Table>

                            </Grid>
                        </Grid>
                    }
                </DialogContent>
            </Dialog>
        </Box>
    )
}

const useStyles = makeStyles((theme) => ({
    imageContainer: {
        width: "100%",
        marginBottom: "5px",
    },
    loadedImage: {
        width: "86px",
        height: "86px",
        margin: "auto",
    },
    avatarContainer: {
        width: "86px",
        height: "86px",
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        "&:hover $hiddenButton": {
            opacity: 1,
        }
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});