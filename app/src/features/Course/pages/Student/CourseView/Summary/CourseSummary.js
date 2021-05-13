import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCourseSummary, clearCourse } from 'features/Course/courseSlice'
import { Grid, Box, Typography, makeStyles, Button } from '@material-ui/core'
import BreadCrumbs from "commons/components/BreadCrumbs";
import { Parallax } from 'react-parallax'
import CKViewer from 'commons/components/CKEditor/CKViewer';
import SectionList from 'features/Course/pages/Student/CourseView/Summary/SectionList'

export default function CourseSummary() {
    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();
    const course = useSelector(state => state.course.course)
    useEffect(() => {
        dispatch(fetchCourseSummary(id));
        return () => {
            dispatch(clearCourse());
        }
    }, [dispatch, id]);
    useEffect(() => {
        // document.getElementById('background-image').style.backgroundImage = `url(${course.thumbnail_url})`;
        // return () => {
        //     document.getElementById('background-image').style.backgroundImage = "none";
        // }
    }, [course]);
    return (
        <div>

            <Parallax bgImage={course.thumbnail_url} blur={{ min: 2, max: 10 }} strength={500}>
                <Box mt={2}>
                    <div className={classes.header}>
                        <BreadCrumbs
                            links={[{ link: `/courses`, description: "Khóa học" }]}
                            current={course.title}>
                        </BreadCrumbs>
                        <Grid
                            className={classes.headerBody}
                            container
                            spacing={3}
                            direction="row"
                            justify="center"
                            alignItems="center"
                            alignContent="center"
                            item
                            md={12}>

                            <Grid
                                item
                                md={7}
                                xs={12}
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                alignContent="center">
                                <Typography variant="h3" className={classes.title}>
                                    {course.title}
                                </Typography>

                                <Typography variant="body1" className={classes.introduce}>
                                    <CKViewer content={course.introduce} />
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <img className={classes.thumbnail} src={course.thumbnail_url} alt={course.title} />
                            </Grid>
                            <Button className={classes.button} variant="contained" color="default">
                                Mua khóa học
                            </Button>
                        </Grid>
                    </div>
                </Box>
            </Parallax>
            <Box className={classes.body}>
                {course.sections.length > 0 && <SectionList sections={course.sections} />}
            </Box>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    header: {
        height: "unset",
        [theme.breakpoints.up("md")]: {
            height: "95vh",
        },
    },
    headerBody: {
        height: "60%",
        padding: 20,
        [theme.breakpoints.up("md")]: {
            paddingLeft: 30,
            margin: 0,
        },
    },
    title: {
        color: "white",
        textShadow: "2px 2px 4px black",
        opacity: "0.9",
    },
    introduce: {
        color: "white",
        opacity: "0.9",
    },
    thumbnail: {
        width: "90%",
        maxHeight: "50vh",
        borderRadius: "10px",
        objectFit: "cover",
    },
    body: {
        // backgroundColor: "white",
        padding: "40px"
    },
    button: {
        background: "white",
        padding: "15px 20px",
        bottom: "10%",
        right: 0,
        [theme.breakpoints.up("md")]: {
            position: "absolute",
            transform: "translate(-50%,-50%)",
        },
    }
}))
