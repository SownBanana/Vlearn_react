import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { fetchCourseSummary, clearCourse, buyCourse as buyCourseAction, rateCourse } from 'features/Course/courseSlice'
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
import { Rating } from '@material-ui/lab';
import useCheckMobile from 'commons/hooks/useCheckMobile';
import { COURSE_THUMBNAIL } from 'commons/enums/ImageDefault';
import { Person } from '@material-ui/icons';

export default function CourseSummary() {
    const classes = useStyles();
    const { id } = useParams();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const course = useSelector(state => state.course.course)
    const bought = useSelector(state => state.course.bought)
    const status = useSelector(state => state.course.status)
    const user = useSelector(state => state.auth.user)
    const role = useSelector(state => state.auth.user.role)
    const history = useHistory();
    const isMobile = useCheckMobile();
    const statistic = useSelector(state => state.course.statistic)
    var ratingArray = [0, 0, 0, 0, 0]
    var totalBought = 0;
    statistic.forEach(rating => {
        if (rating.rate)
            ratingArray[rating.rate - 1] = rating.rate_count;
        totalBought += rating.rate_count;
    })

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
            <Parallax bgImage={course.thumbnail_url || COURSE_THUMBNAIL} blur={{ min: 2, max: 10 }} strength={500}>
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
                                <img className={classes.thumbnail} src={course.thumbnail_url || COURSE_THUMBNAIL} alt={course.title} />
                            </Grid>
                            <Box className={classes.totalGroup}>
                                <Person fontSize={!isMobile ? "large" : "default"} />
                                <span style={{ marginRight: 3 }} >{course.total}</span>
                            </Box>
                            {
                                bought || course.instructor_id === user.id ?
                                    <Box className={classes.buyGroup}>
                                        <Button onClick={() => learnCourse()} className={classes.button} variant="contained" color="default">
                                            Vào học
                                        </Button>
                                    </Box>
                                    :
                                    <Box className={classes.buyGroup}>
                                        <Box className={classes.price}>
                                            {(course.price > 0 ? course.price : 'Miễn phí').toLocaleString('it', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                        </Box>
                                        <Button onClick={() => buyCourse()} className={classes.button} variant="contained" color="default">
                                            Mua khóa học
                                        </Button>
                                    </Box>
                            }
                        </Grid>
                    </div>
                </Box>
            </Parallax>
            <Box className={classes.body}>
                <Typography variant="h5" align="left" color="initial">Nội dung khóa học</Typography>
                {course.instructor && <SectionList sections={course.sections} instructor={course.instructor} />}
            </Box>
            <Box mx={isMobile ? 1 : 5} mb={isMobile ? 1 : 5}>
                <Grid container direction="row">
                    <Grid md={6} xs={12} container item spacing={1}>
                        <Grid item md={10}>
                            <RatingStats ratings={ratingArray.reverse()} />
                        </Grid>
                    </Grid>
                    <Grid container direction="column" alignItems={isMobile ? "center" : "flex-start"} spacing={0} item md={6} xs={12}>
                        {
                            bought &&
                            <Box mb={isMobile ? 1 : 3} mt={isMobile ? 3 : 0}>
                                <Rating
                                    name="course-rate"
                                    defaultValue={course.rate}
                                    size="large"
                                    onChange={(e, value) => dispatch(rateCourse({
                                        course_id: course.id,
                                        rate: value
                                    }))}
                                />
                            </Box>
                        }
                        <CommentView course={course} content={course.comment} commentable={bought} />
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
    totalGroup: {
        display: "flex",
        alignItems: "center",
        color: "white",
        bottom: "3%",
        left: theme.spacing(4),
        position: "absolute",
        transform: "translate(-50%,-50%)",
        [theme.breakpoints.up("md")]: {
            left: theme.spacing(10),
            bottom: "12%",
            fontSize: 22
        }
    },
    buyGroup: {
        bottom: "10%",
        right: 0,
        [theme.breakpoints.up("md")]: {
            position: "absolute",
            transform: "translate(-50%,-50%)",
        },
    },

    button: {
        background: "white",
        padding: "15px 20px",
    },
    price: {
        color: "white",
        fontSize: "1.5rem",
        fontWeight: "bold",
    }
}))
