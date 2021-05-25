import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    Divider,
    Slider
} from '@material-ui/core';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

export default function LiveLessonSettingDialog({ open, handleClose, lesson, setLesson }) {
    const classes = useStyles();

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Cài đặt chương học</DialogTitle>
            <DialogContent>
                <DialogContentText >
                    Thời gian
                </DialogContentText>
                <Divider style={{ margin: "-15px 0 10px 0" }} />
                <Box display="flex" mb={2}>
                    <KeyboardDateTimePicker
                        style={{ marginRight: 10 }}
                        label="Bắt đầu"
                        variant="inline"
                        ampm={false}
                        disablePast
                        style={{ width: "100%" }}
                        format="HH:mm DD/MM/yyy"
                        value={new Date(lesson.start_time)}
                        onChange={
                            (date) => setLesson({ ...lesson, start_time: date.format("yyyy-MM-DD HH:mm") })
                        } />

                    <KeyboardDateTimePicker
                        label="Kết thúc"
                        variant="inline"
                        ampm={false}
                        disablePast
                        style={{ width: "100%" }}
                        format="HH:mm DD/MM/yyy"
                        value={new Date(lesson.end_time)}
                        onChange={
                            (date) => setLesson({ ...lesson, end_time: date.format("yyyy-MM-DD HH:mm") })
                        } />
                </Box>
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
    );
}
const useStyles = makeStyles({})

