import { Avatar, Box, IconButton, ListItem, Paper, Typography, Button, Divider } from '@material-ui/core'
import { Lock, LockOpen, PanTool } from '@material-ui/icons';
import { UserRole } from 'features/Authenticate/constance';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { drawAllPermission, setPermission } from '../learnSlice';

export default function StudentList({ channel }) {
    const students = useSelector(state => state.learnCourse.course.students);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
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
                            <ListItem button>
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
        </Box>
    )
}
