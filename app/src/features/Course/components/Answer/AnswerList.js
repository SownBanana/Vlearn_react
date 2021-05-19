import React, { useState } from "react";
import { List, arrayMove, arrayRemove } from "react-movable";
import { cloneDeep } from "lodash";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { deleteAnswer as deleteAction } from "features/Course/editingCourseSlice";
import AnswerInput from "./AnswerInput";

export default function AnswerList({ answers, setAnswers }) {
    const [expanded, setExpanded] = useState(0);
    const dispatch = useDispatch();
    const changeAnswer = (answer) => {
        // debugger
        const newAnswers = cloneDeep(answers).map((q, index) => {
            // console.log("index = ");
            if (q.uuid === answer.uuid) {
                answer.order = index;
                return answer;
            }
            q.order = index;
            return q;
        });
        setAnswers(newAnswers);
    };
    const deleteAnswer = (answer) => {
        dispatch(deleteAction(answer.id));
        const newAnswers = cloneDeep(answers).filter((l) => l.uuid !== answer.uuid);
        setAnswers(newAnswers);
    };
    const handleExpanded = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <List
            removableByMove
            values={answers}
            onChange={({ oldIndex, newIndex }) => {
                if (newIndex === -1) {
                    dispatch(deleteAction(answers[oldIndex].id));
                }
                setAnswers(
                    newIndex === -1
                        ? arrayRemove(answers, oldIndex)
                        : arrayMove(answers, oldIndex, newIndex)
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
                        padding: "0em 0em 0.3em 0em",
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
                        <AnswerInput
                            {...props}
                            answer={value}
                            handleChange={changeAnswer}
                            handleDelete={deleteAnswer}
                            expanded={expanded}
                            handleExpanded={handleExpanded}
                        />
                    </Grid>
                )
            }
        />
    );
}
