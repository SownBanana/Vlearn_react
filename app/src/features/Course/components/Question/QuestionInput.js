import React, { lazy, Suspense } from "react";
import {
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    makeStyles,
    IconButton,
    Typography, Select, MenuItem, useMediaQuery,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import ConfirmButton from "commons/components/Button/ConfirmIconButton";
import {
    setContent,
    setHandler,
    setOpen,
    setTitle,
} from "commons/components/EditorModal/editorSlice";
import { useDispatch } from "react-redux";
import { setContentEditMode } from 'features/Course/editingCourseSlice'
import { cloneDeep } from "lodash";
import AddIcon from '@material-ui/icons/Add';
import AnswerList from "../Answer/AnswerList";
import FilterFramesIcon from '@material-ui/icons/FilterFrames';
import uuidv4 from "commons/uuidv4";
import { getPureText } from "commons/getPureText";
// import CKViewer from "commons/components/CKEditor/CKViewer";
const CKViewer = lazy(() => import("commons/components/CKEditor/CKViewer"));

export default function QuestionInput({
    question,
    handleChange,
    handleDelete,
    expanded,
    handleExpanded,
}) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const isMobile = useMediaQuery("(max-width: 760px)");

    const changeQuestionContent = (content) => {
        handleChange({ ...question, question: content });
    };
    const deleteQuestion = () => {
        handleDelete(question);
    };

    const setAnswers = (answers) => {
        handleChange({ ...question, answers: answers });
    };

    const addQuestion = (e) => {
        e.stopPropagation();
        console.log(e);
        console.log("Add Answer");
        var newAnswers = cloneDeep(question.answers);
        newAnswers.push({ uuid: uuidv4() });
        setAnswers(newAnswers);
    }

    const openQuestionEditPopup = (e) => {
        e.stopPropagation();
        dispatch(setTitle("Soạn câu hỏi"));
        dispatch(setContent(question.question));
        dispatch(setHandler(changeQuestionContent));
        dispatch(setOpen(true));
    }
    const openQuestionEdit = (e) => {
        e.stopPropagation();
        dispatch(setContent(question.question));
        dispatch(setHandler(changeQuestionContent));
        dispatch(setContentEditMode(true));
    }
    
    return (
        <Accordion
            expanded={expanded === question.uuid}
            onChange={handleExpanded(question.uuid)}
            className={classes.root}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                classes={{ root: classes.summary, content: classes.summaryContent }}
            >
                <DragIndicatorIcon color="action" data-movable-handle />
                <Typography className={classes.questionText} align="left" variant="body1" color="textSecondary">{getPureText(question.question)}</Typography>
                {/* <Select
                    style={{ marginRight: "10px" }}
                    value={question.type || 0}
                    onChange={(e) => {
                        e.stopPropagation();
                        handleChange({ ...question, type: e.target.value })
                    }}
                >
                    <MenuItem value={0}>{isMobile ? "Single" : "Một lựa chọn"}</MenuItem>
                    <MenuItem value={1}>{isMobile ? "Multi" : "Nhiều lựa chọn"}</MenuItem>
                </Select> */}
                <IconButton
                    onClick={addQuestion}
                    edge="start"
                    className="button"
                    classes={{ root: classes.addButton }}

                >
                    <AddIcon fontSize="small" />
                </IconButton>
                <IconButton
                    color="primary"
                    onClick={openQuestionEditPopup}
                    edge="start"
                    className="button"
                >
                    <FilterFramesIcon fontSize="small" />
                </IconButton>
                <IconButton
                    color="primary"
                    onClick={openQuestionEdit}
                    edge="start"
                    className="button"
                >
                    <EditRoundedIcon fontSize="small" />
                </IconButton>
                <ConfirmButton
                    color="secondary"
                    onClick={deleteQuestion}
                    edge="start"
                    className="button"
                    title={"Xóa câu hỏi"}
                    message={"Bạn thực sự muốn xóa câu hỏi này?"}
                >
                    <DeleteRoundedIcon fontSize="small" />
                </ConfirmButton>
            </AccordionSummary>
            <AccordionDetails className={classes.content}>
                {question.answers && <AnswerList answers={question.answers} setAnswers={setAnswers} />}
            </AccordionDetails>
        </Accordion>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        padding: 0,
        borderBottom: "1px solid #d3d3d378",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    underline: {
        "&::before": {
            border: "none",
            transition: "3s",
        },
        "&::after": {
            // border: "2px solid red",
        },
    },
    labelInput: {
        // padding: 0,
        height: "auto",
    },
    input: {
        display: "none",
    },
    content: {
        backgroundColor: "#f0f0f0",
        padding: "5px",
    },
    summaryContent: {
        alignItems: "center",
        width: "90%"
    },
    summary: {
        height: "50px"
    },
    addButton: {
        color: theme.palette.success.main,
    },
    questionText: {
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    }
}));
