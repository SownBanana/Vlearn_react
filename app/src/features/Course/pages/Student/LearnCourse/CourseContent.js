import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getLesson, getLiveLesson, getQuestions } from 'features/Course/pages/Student/LearnCourse/learnSlice'
import clsx from 'clsx'
export default function CourseContent() {
    const classes = useStyles();
    const course = useSelector(state => state.learnCourse.course);
    const selectedLesson = useSelector(state => state.learnCourse.lesson);
    const selectedLiveLesson = useSelector(state => state.learnCourse.liveLesson);
    const selectedQuestion = useSelector(state => state.learnCourse.question);
    const dispatch = useDispatch();
    const changeLesson = (id) => {
        dispatch(getLesson(id));
    }
    const changeLiveLesson = (id) => {
        dispatch(getLiveLesson(id));
    }
    const changeQuestions = (id) => {
        dispatch(getQuestions(id));
    }
    return (
        <Typography variant="body2" color="textSecondary" className={classes.root}>
            <Typography style={{ marginLeft: 10 }} variant="body1" align="left">Mục lục</Typography>
            <ul className={classes.ul}>
                {
                    course.sections.map((section) => {
                        return (
                            <li key={section.id}>
                                <p className={classes.ulTitle}>{section.name}</p>
                                <ul className={classes.ul}>
                                    {
                                        section.live_lessons.map((liveLesson) => {
                                            return (
                                                <li key={liveLesson.id} className={clsx(classes.li, liveLesson.id === selectedLiveLesson.id && classes.liSelected)}
                                                    onClick={() => changeLiveLesson(liveLesson.id)}>
                                                    {liveLesson.name}
                                                </li>
                                            )
                                        })
                                    }
                                    {
                                        section.lessons.map((lesson) => {
                                            return (
                                                <li key={lesson.id} className={clsx(classes.li, lesson.id === selectedLesson.id && classes.liSelected)}
                                                    onClick={() => changeLesson(lesson.id)}>
                                                    {lesson.name}
                                                </li>
                                            )
                                        })
                                    }
                                    {
                                        (section.questions.length > 0) && (
                                            <li key={section.id + "qs"} className={clsx(classes.li,
                                                (section.id === selectedQuestion.section_id)
                                                && classes.liSelected)}
                                                onClick={() => changeQuestions(section.id)}>
                                                Câu hỏi
                                            </li>
                                        )
                                    }
                                </ul>
                            </li>
                        )
                    })
                }
            </ul>
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 5,
        backgroundColor: "white",
        borderRadius: 5,
        border: "1px solid #cecece80",
        padding: 10
    },
    ul: {
        padding: 0,
        margin: 0,
        listStyle: "none",
        textAlign: "left",
        // fontSize: 13,
        marginLeft: 10,
    },
    ulTitle: {
        color: "#585858",
        fontWeight: "bold"
    },
    li: {
        cursor: "pointer",
        padding: "5px",
        color: "#585858",
        borderLeft: "3px solid #ffffff00",
        transition: "0.2s",
        "&:hover": {
            borderLeft: "3px solid #0753c780",
            backgroundColor: "#0753c720",
        }
    },
    liSelected: {
        borderLeft: "3px solid #0753c770",
        backgroundColor: "#0753c710",
    }
}))