import React, { useState } from "react";
import { List, arrayMove, arrayRemove } from "react-movable";
import { cloneDeep } from "lodash";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { deleteQuestion as deleteAction } from "features/Course/editingCourseSlice";
import QuestionInput from "./QuestionInput";

export default function QuestionList({ questions, setQuestions }) {
    const [expanded, setExpanded] = useState(0);
    const dispatch = useDispatch();
    const changeQuestion = (question) => {
        const newQuestions = cloneDeep(questions).map((q, index) => {
            // console.log("index = ");
            if (q.uuid === question.uuid) {
                question.order = index;
                return question;
            }
            q.order = index;
            return q;
        });
        setQuestions(newQuestions);
    };
    const deleteQuestion = (question) => {
        dispatch(deleteAction(question.id));
        const newQuestions = cloneDeep(questions).filter((l) => l.uuid !== question.uuid);
        setQuestions(newQuestions);
    };
    const handleExpanded = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <List
            removableByMove
            values={questions}
            onChange={({ oldIndex, newIndex }) => {
                if (newIndex === -1) {
                    dispatch(deleteAction(questions[oldIndex].id));
                }
                setQuestions(
                    newIndex === -1
                        ? arrayRemove(questions, oldIndex)
                        : arrayMove(questions, oldIndex, newIndex)
                );
            }}
            renderList={({ children, props, isDragged }) => (
                <Grid
                    container
                    item
                    md={12}
                    xs={12}
                    {...props}
                    style={{
                        padding: "0em 0em 1em 0em",
                        cursor: isDragged ? "grabbing" : undefined,
                        listStyle: "none",
                    }}
                >
                    {children}
                </Grid>
            )}
            renderItem={({ value, props, isDragged, isSelected, isOutOfBounds }) =>
                value && (
                    <Grid
                        key={value.uuid}
                        container
                        item
                        md={12}
                        xs={12}
                        {...props}
                        style={{
                            ...props.style,
                            // paddingLeft: "0.5em",
                            listStyleType: "none",
                            cursor: isDragged ? "grabbing" : "grab",
                            borderRadius: "6px",
                            fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                            borderRight:
                                isDragged || isSelected
                                    ? isOutOfBounds
                                        ? "6px solid #F08080"
                                        : "6px solid #e4de0a69"
                                    : "6px solid #e4de0a",
                        }}
                    >
                        <QuestionInput
                            {...props}
                            question={value}
                            handleChange={changeQuestion}
                            handleDelete={deleteQuestion}
                            expanded={expanded}
                            handleExpanded={handleExpanded}
                        />
                    </Grid>
                )
            }
        />
    );
}
