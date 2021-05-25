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
import { DateTimePicker, KeyboardDateTimePicker } from '@material-ui/pickers';

export default function SectionSettingDialog({ open, handleClose, section, setSection }) {
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
                        value={new Date(section.start_time)}
                        onChange={
                            (date) => setSection({ ...section, start_time: date.format("yyyy-MM-DD HH:mm") })
                        } />

                    <KeyboardDateTimePicker
                        label="Kết thúc"
                        variant="inline"
                        ampm={false}
                        disablePast
                        style={{ width: "100%" }}
                        format="HH:mm DD/MM/yyy"
                        value={new Date(section.end_time)}
                        onChange={
                            (date) => setSection({ ...section, end_time: date.format("yyyy-MM-DD HH:mm") })
                        } />
                </Box>

                <DialogContentText >
                    Câu hỏi
                </DialogContentText>
                <Divider style={{ margin: "-15px 0 10px 0" }} />
                <Box display="flex" width="100%" style={{ justifyContent: "space-between" }}>
                    <div style={{ width: "63%" }} >
                        <Typography color="textSecondary" variant="caption" gutterBottom>
                            Thời gian làm bài:  {section.question_duration ? `${section.question_duration} phút` : 'không đặt'}
                        </Typography>
                        <Slider
                            defaultValue={section.question_duration || 0}
                            valueLabelDisplay="auto"
                            marks={[{ value: 15 }, { value: 30 }, { value: 60 }, { value: 90 }]}
                            min={0}
                            max={300}
                            onChangeCommitted={(e, value) => setSection({ ...section, question_duration: value })}
                        />
                    </div>
                    <Box style={{ width: "35%" }} >
                        <Typography color="textSecondary" variant="caption" gutterBottom>
                            Điểm để qua: {section.pass_point ? `${section.pass_point} điểm` : 'không giới hạn'}
                        </Typography>
                        <Slider
                            defaultValue={section.pass_point || 0}
                            valueLabelDisplay="auto"
                            step={5}
                            marks={[{ value: 50 }, { value: 75 }]}
                            min={0}
                            max={100}
                            onChangeCommitted={(e, value) => setSection({ ...section, pass_point: value })}
                        />
                    </Box>
                </Box>
                <TextField
                    style={{ width: "100%" }}
                    label={`Giới hạn làm bài:  ${section.question_step > 0 ? (section.question_step < 366 ? `${section.question_step} ngày` : `chỉ làm một lần`) : `không giới hạn`}`}
                    value={section.question_step || 0}
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 366 } }}
                    onChange={(e) => setSection({ ...section, question_step: e.target.value })}
                />
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
    );
}
const useStyles = makeStyles({})

