import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { fetchCourseSummary, clearCourse, buyCourse as buyCourseAction } from 'features/Course/courseSlice'
import { Grid, Box, Typography, makeStyles, Button, useMediaQuery } from '@material-ui/core'
import BreadCrumbs from "commons/components/BreadCrumbs";
import { Parallax } from 'react-parallax'
import CKViewer from 'commons/components/CKEditor/CKViewer';
import SectionList from 'features/Course/pages/Student/CourseView/Summary/SectionList'
import { UserRole } from 'features/Authenticate/constance';
import { setPreviousURL } from "commons/SliceCommon";
import RatingStats from 'commons/components/Rating/RatingStats';
import CommentView from 'commons/components/Comment/CommentView';
import { makeToast, ToastType } from 'features/Toast/toastSlices';

export default function CourseSummary() {
    const classes = useStyles();
    const { id } = useParams();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const course = useSelector(state => state.course.course)
    const bought = useSelector(state => state.course.bought)
    const status = useSelector(state => state.course.status)
    const role = useSelector(state => state.auth.user.role)
    const history = useHistory();
    const isMobile = useMediaQuery("(max-width: 760px)");
    const buyCourse = () => {
        if (!role) {
            dispatch(setPreviousURL(pathname));
            history.push('/auth/login');
        } else if (role === UserRole.STUDENT) {
            dispatch(buyCourseAction(id));
        } else {
            dispatch(makeToast('Chỉ học sinh mới có thể mua khoa học', ToastType.INFO));
        }
    }
    const learnCourse = () => {
        console.log("Learn ", id);
        history.push(`/courses/learn/${id}`)
    }

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
                                // alignItems="center"
                                alignContent="center"
                            >
                                <Typography align="left" variant="h3" className={classes.title}>
                                    {course.title}
                                </Typography>

                                <Typography align="left" variant="body1" className={classes.introduce}>
                                    <CKViewer content={course.introduce} />
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <img className={classes.thumbnail} src={course.thumbnail_url} alt={course.title} />
                            </Grid>
                            {!bought ?
                                <Button onClick={() => buyCourse()} className={classes.button} variant="contained" color="default">
                                    Mua khóa học
                                </Button>
                                :
                                <Button onClick={() => learnCourse()} className={classes.button} variant="contained" color="default">
                                    Vào học
                                </Button>
                            }
                        </Grid>
                    </div>
                </Box>
            </Parallax>
            <Box className={classes.body}>
                <Typography variant="h5" align="left" color="initial">Nội dung khóa học</Typography>
                {course.sections.length > 0 && <SectionList sections={course.sections} instructor={course.instructor} />}
            </Box>
            <Box mx={isMobile ? 1 : 5} mb={isMobile ? 1 : 5}>
                <Grid container direction="row">
                    <Grid md={6} xs={12} container item spacing={1}>
                        <Grid item md={10}>
                            <RatingStats ratings={[20, 25, 12, 7, 3]} raterCount={67} />
                        </Grid>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <CommentView />
                    </Grid>
                </Grid>
            </Box>
            {/* {
                    isMobile ?
                        (
                            <Box mx={1} mt={3}>
                                <CommentView />
                            </Box>
                        ) :
                        (
                            <Box mx={10} my={10}>
                                <CommentView />
                            </Box>
                        )
                } */}
        </div >
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
        fontSize: "1.2rem",
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
