import React, { useEffect, useState } from 'react'
import {
    Box,
    useMediaQuery,
    Typography,
    Divider,
    Grid,
    Checkbox,
    RadioGroup,
    Radio,
    IconButton,
    Button,
    makeStyles,
    Zoom,
    Collapse
} from '@material-ui/core';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import clsx from 'clsx';
import CKViewer from 'commons/components/CKEditor/CKViewer';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useDispatch, useSelector } from 'react-redux';
import { calculateAnswers, checkAnswer, checkSingleAnswer, getNextSection, navQuestion, setLesson } from './learnSlice';
import { css, StyleSheet } from 'aphrodite';
import { headShake } from 'react-animations';

export default function QuestionView() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const questions = useSelector(state => state.learnCourse.questions);
    const questionIndex = useSelector(state => state.learnCourse.currentQuestionIndex);
    const result = useSelector(state => state.learnCourse.result);
    const question = useSelector(state => state.learnCourse.question);
    const isMobile = useMediaQuery("(max-width: 790px)");
    const isTimeUp = Object.keys(result).length > 0;
    const renderTimer = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return <Typography variant="h6" className={css(styles.headShake)}>Hết giờ!!!</Typography>;
        }

        return (
            <div className={classes.timer}>
                <div className={classes.timerText}>Còn lại</div>
                <div className={classes.timerValue}>{remainingTime}</div>
            </div >
        );
    };
    return (
        question &&
        <Grid container direction="row">
            <Grid item xs={12} md={3}>
                <Box ml={isMobile ? 0 : 2} mt={2} py={2} style={{ backgroundColor: "white", border: "1px solid #cecece60", boxShadow: "black 1px 1px 5px -3px", borderRadius: "5px" }}>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                        <CountdownCircleTimer
                            isPlaying
                            duration={!isTimeUp ? 10 : 0}
                            colors={[["#004777", 0.15], ["#004777", 0.4], ["#F7B801", 0.4], ["#A30000"]]}
                            onComplete={() => {
                                dispatch(calculateAnswers());
                            }}
                            size={140}
                        >
                            {renderTimer}
                        </CountdownCircleTimer>
                    </Grid>
                    <div className={classes.gridContainer}>
                        {
                            questions.map((question, index) => {
                                const doneQuestion = question.answers.some((answer) => {
                                    return answer.is_check;
                                })
                                const doneSingleQuestion = question.checkSingleAnswer;
                                return <div
                                    className={clsx(classes.gridItem,
                                        {
                                            [classes.doneItem]: doneQuestion || (doneSingleQuestion !== null && doneSingleQuestion !== undefined),
                                            [classes.currentItem]: questionIndex === index,
                                        })}
                                    onClick={() => dispatch(navQuestion(index))}
                                >
                                    {index + 1}
                                </div>
                            })
                        }
                    </div>
                </Box>
            </Grid>
            <Grid item xs={12} md={9}>
                {
                    <Collapse in={isTimeUp}>
                        <Box mx={isMobile ? 0 : 2} mt={2} p={2} style={{ backgroundColor: "white", border: "1px solid #cecece60", boxShadow: "black 1px 1px 5px -3px", borderRadius: "5px" }}>
                            <Button style={{
                                float: "right",
                                marginBottom: -50,
                            }}
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={() => dispatch(getNextSection(question.section_id))}
                            >
                                Chương tiếp theo
                                </Button>
                            <Grid
                                container
                                spacing={1}
                                direction="column"
                                justify="center"
                                alignItems="center"
                                alignContent="center"
                            >
                                <Typography variant="h5" color="initial">Kết quả</Typography>
                                <Typography variant="h4" color="textSecondary">{result.fancy_point} điểm</Typography>
                                <Divider />
                                <Typography style={{ marginTop: 10 }} variant="body2" color="initial">Điểm cao nhất đã đạt được {result.fancy_point > result.last_highest_point && "trước đó"}</Typography>
                                <Typography variant="h6" color="textSecondary">{result.last_highest_point} điểm</Typography>
                            </Grid>
                        </Box>
                    </Collapse>
                }
                <Box mx={isMobile ? 0 : 2} mt={2} p={2} style={{ backgroundColor: "white", border: "1px solid #cecece60", boxShadow: "black 1px 1px 5px -3px", borderRadius: "5px" }}>
                    <Grid container spacing={1} direction="row" justify="space-evenly" alignItems="center" style={{ marginBottom: 20 }}>
                        <IconButton color="secondary" size="small" disabled={questionIndex === 0} onClick={() => dispatch(navQuestion(questionIndex - 1))}>
                            <ArrowLeft fontSize="large" />
                        </IconButton>
                        <Typography variant="h6" color="initial">Câu hỏi {questionIndex + 1}/{questions.length}</Typography>
                        <IconButton color="secondary" size="small" disabled={questionIndex === questions.length - 1} onClick={() => dispatch(navQuestion(questionIndex + 1))}>
                            <ArrowRight fontSize="large" />
                        </IconButton>
                    </Grid>
                    {!!question.question &&
                        <Box px={4}>
                            <CKViewer content={question.question} />
                        </Box>
                    }
                    <Divider />
                    <Box px={4}>
                        {
                            question.is_multi ?
                                (
                                    question.answers.map((answer, index) => {
                                        return (
                                            <Grid container spacing={1} direction="row">
                                                <Checkbox
                                                    disabled={isTimeUp}
                                                    checked={answer.is_check || false}
                                                    onChange={(e) => { dispatch(checkAnswer({ index, value: e.target.checked })) }}
                                                    color="primary"
                                                />
                                                <CKViewer content={answer.content} />
                                            </Grid>
                                        )
                                    })
                                ) :
                                (
                                    <RadioGroup value={question.checkSingleAnswer !== undefined ? question.checkSingleAnswer : -1} onChange={(e) => dispatch(checkSingleAnswer(parseInt(e.target.value)))}>
                                        {
                                            question.answers.map((answer, index) => {
                                                return (
                                                    <Grid container spacing={1} direction="row">
                                                        <Radio disabled={isTimeUp} value={index} />
                                                        <CKViewer content={answer.content} />
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </RadioGroup>
                                )
                        }
                    </Box>
                    <Divider />
                    <Grid className={classes.footer} container spacing={1} direction="row" justify="center">
                        <IconButton color="primary" size="small" disabled={questionIndex === 0} onClick={() => dispatch(navQuestion(questionIndex - 1))}>
                            <ArrowLeft fontSize="large" />
                        </IconButton>
                        {
                            !isTimeUp &&
                            <Button variant="outlined" color="primary" size="small" onClick={() => dispatch(calculateAnswers())}>
                                Chấm điểm
                            </Button>
                        }
                        <IconButton color="primary" size="small" disabled={questionIndex === questions.length - 1} onClick={() => dispatch(navQuestion(questionIndex + 1))}>
                            <ArrowRight fontSize="large" />
                        </IconButton>
                    </Grid>
                </Box>
            </Grid >
        </Grid >
    )
}

const styles = StyleSheet.create({
    headShake: {
        animationName: headShake,
        animationDuration: "1s",
    },
});

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: 20,
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "auto auto auto auto",
        padding: 3,
        marginTop: 20
    },
    gridItem: {
        padding: "10px 7px",
        margin: 5,
        borderRadius: 5,
        fontWeight: "bold",
        border: "1px dashed #cecece"
    },
    doneItem: {
        backgroundColor: "#3481f3d9",
        color: "white",
    },
    currentItem: {
        border: `1px solid ${theme.palette.secondary.main}`,
    },
    timer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    timerText: {
        color: "#aaa",
    },
    timerValue: {
        fontSize: "40px"
    }
}))