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
                    <TextField
                        style={{ marginRight: 10 }}
                        bgcolor="primary.main"
                        mr={4}
                        label="Bắt đầu"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue={section.start_time}
                        onChange={(e) => setSection({ ...section, start_time: e.target.value })}
                    />
                    <TextField
                        label="Kết thúc"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue={section.end_time}
                        onChange={(e) => setSection({ ...section, end_time: e.target.value })}
                    />
                </Box>
                <DialogContentText >
                    Câu hỏi
                </DialogContentText>
                <Divider style={{ margin: "-15px 0 10px 0" }} />
                <div style={{ width: "100%" }} >
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
                <div style={{ width: "100%" }} >
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
                </div>
                <TextField
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

