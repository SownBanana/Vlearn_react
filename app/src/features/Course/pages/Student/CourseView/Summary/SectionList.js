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

function SectionList({ sections, instructor }) {
    const classes = useStyles();
    return (
        <Grid
            container spacing={3}>
            <Grid item md={8} xs={12}>
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
            <Grid item md={4} xs={12} >
                <Avatar className="avatar--large avatar--center" src={instructor.avatar_url} />
                <Typography variant="h6" color="initial">
                    {instructor.name}
                </Typography>
                <Typography variant="body1" color="initial">
                    {instructor.introduce}
                </Typography>
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


}));

export default SectionList;
