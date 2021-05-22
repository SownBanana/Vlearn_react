import React, { lazy, Suspense } from "react";
import {
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    makeStyles,
    IconButton,
    Typography, Select, MenuItem, Checkbox, FormControlLabel,
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
import { getPureText } from "commons/getPureText";
const CKViewer = lazy(() => import("commons/components/CKEditor/CKViewer"));

export default function AnswerInput({
    answer,
    handleChange,
    handleDelete,
    expanded,
    handleExpanded,
}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const changeAnswerContent = (content) => {
        handleChange({ ...answer, content: content });
    };
    const deleteAnswer = () => {
        handleDelete(answer);
    };

    const openAnswerEdit = (e) => {
        e.stopPropagation();
        dispatch(setTitle("Soạn câu trả lời"));
        dispatch(setContent(answer.content));
        dispatch(setHandler(changeAnswerContent));
        dispatch(setOpen(true));
        // dispatch(setContentEditMode(true));
    }
    return (
        <Accordion
            expanded={expanded === answer.uuid}
            onChange={handleExpanded(answer.uuid)}
            className={classes.root}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                classes={{ root: classes.summary, content: classes.summaryContent }}
            >
                <DragIndicatorIcon color="action" data-movable-handle />
                <FormControlLabel
                    className={classes.contentLabel}
                    control={
                        <Checkbox
                            checked={answer.is_true === 1}
                            onChange={(e) => {
                                e.stopPropagation();
                                handleChange({ ...answer, is_true: e.target.checked ? 1 : 0 })
                            }
                            }
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    }
                    label={getPureText(answer.content)}
                />

                <div style={{ width: "100%" }} ></div>
                <IconButton
                    color="primary"
                    onClick={openAnswerEdit}
                    edge="start"
                    className="button"
                >
                    <EditRoundedIcon fontSize="small" />
                </IconButton>
                <ConfirmButton
                    color="secondary"
                    onClick={deleteAnswer}
                    edge="start"
                    className="button"
                    title={"Xóa câu hỏi"}
                    message={"Bạn thực sự muốn xóa câu hỏi này?"}
                >
                    <DeleteRoundedIcon fontSize="small" />
                </ConfirmButton>
            </AccordionSummary>
            <AccordionDetails className={classes.content}>
                <CKViewer content={answer.content} />
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
        padding: "15px",
    },
    summaryContent: {
        alignItems: "center",
        width: "90%",
    },
    summary: {
        height: "50px"
    },
    addButton: {
        color: theme.palette.success.main,
    },
    contentLabel: {
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    }
}));
