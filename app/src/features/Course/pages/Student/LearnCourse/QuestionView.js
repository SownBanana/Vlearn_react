import { Box, useMediaQuery, Typography, Divider, Grid, Checkbox, FormControlLabel, RadioGroup, Radio, IconButton, Button, makeStyles } from '@material-ui/core';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import clsx from 'clsx';
import CKViewer from 'commons/components/CKEditor/CKViewer';
import React, { useEffect, useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useDispatch, useSelector } from 'react-redux';
import { calculateAnswers, checkAnswer, checkSingleAnswer, navQuestion } from './learnSlice';

export default function QuestionView() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const questions = useSelector(state => state.learnCourse.questions);
    const questionIndex = useSelector(state => state.learnCourse.currentQuestionIndex);
    const result = useSelector(state => state.learnCourse.result);
    const question = useSelector(state => state.learnCourse.question);
    const isMobile = useMediaQuery("(max-width: 790px)");

    const renderTimer = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return <div className={classes.timer}>Hết giờ</div>;
        }

        return (
            <div className={classes.timer}>
                <div className={classes.timerText}>Còn lại</div>
                <div className={classes.timerValue}>{remainingTime}</div>
            </div>
        );
    };
    return (
        question &&
        <Grid container direction="row">
            <Grid item xs={12} md={3}>
                <Box ml={isMobile ? 0 : 2} mt={2} pt={2} style={{ backgroundColor: "white", border: "1px solid #cecece60", boxShadow: "black 1px 1px 5px -3px", borderRadius: "5px" }}>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                        <CountdownCircleTimer
                            isPlaying
                            duration={60}
                            colors={[["#004777", 0.3], ["#004777", 0.3], ["#F7B801", 0.3], ["#A30000"]]}
                            onComplete={() => {
                                console.log("Cham diem")
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
                    if()
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
                                                        <Radio value={index} />
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
                        <Button variant="outlined" color="primary" size="small" onClick={() => dispatch(calculateAnswers())}>
                            Chấm điểm
                        </Button>
                        <IconButton color="primary" size="small" disabled={questionIndex === questions.length - 1} onClick={() => dispatch(navQuestion(questionIndex + 1))}>
                            <ArrowRight fontSize="large" />
                        </IconButton>
                    </Grid>
                </Box>
            </Grid >
        </Grid >
    )
}

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: 20,
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "auto auto auto auto",
        padding: 3
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