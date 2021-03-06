import React, { useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    makeStyles,
    Box, Typography, Grid, Paper, Avatar
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CKViewer from "commons/components/CKEditor/CKViewer";
import useCheckMobile from "commons/hooks/useCheckMobile";
import { useHistory } from "react-router-dom";
import clsx from 'clsx';

function SectionList({ sections, instructor }) {
    const classes = useStyles();
    const isMobile = useCheckMobile();
    const history = useHistory()
    const openProfile = () => {
        history.push(`/info/${instructor.username}`)
    }
    return (
        <Grid
            container spacing={3}>
            <Grid item md={6} xs={12}>
                {
                    sections.map((section) => {
                        return (
                            < Box mb={1} >
                                <Accordion
                                    className={classes.card}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        className="section"
                                    >
                                        <Typography variant="subtitle1" color="initial">
                                            {section.name}
                                        </Typography>

                                        {/* <div className={classes.column}>
                                <Typography className={classes.secondaryHeading}> {section.name}</Typography>
                            </div> */}
                                    </AccordionSummary>
                                    <Divider />
                                    <AccordionDetails className={classes.details}>
                                        <Grid container spacing={1} direction="column">
                                            {
                                                section.lessons.map((lesson) => {
                                                    return (
                                                        <Grid item>
                                                            <Paper variant="outlined" style={{ padding: "10px 20px", textAlign: "left" }}>
                                                                {lesson.name ? lesson.name : "Lesson Name"}
                                                            </Paper>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </ Box>)
                    })
                }
            </Grid>
            <Grid item md={6} xs={12} >
                <Box p={0} mt={isMobile ? 0 : -6}>
                    <Avatar
                        onClick={openProfile}
                        src={instructor.avatar_url}
                        className={clsx(classes.avatar, "avatar--large avatar--center")}
                    />
                    <Typography variant="h6" color="initial">
                        {instructor.name}
                    </Typography>
                    <Typography variant="body1" color="initial">
                        <CKViewer content={instructor.introduce} />
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({
    card: {
        border: "1px solid #80808036",
        padding: 0
    },

    heading: {
        fontSize: theme.typography.pxToRem(15),
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
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: "bottom",
        height: 20,
        width: 20,
    },
    details: {
        padding: "5px",
        // backgroundColor: "#f0f0f06b"
    },
    column: {
        flexBasis: "33.33%",
    },
    column2: {
        flexBasis: "66.66%",
    },
    avatar: {
        cursor: "pointer",
        transition: "0.4s",
        "&:hover": {
            opacity: '0.8',
            borderRadius: "30%",
            transition: "0.25s",
        },
    },

}));

export default SectionList;
