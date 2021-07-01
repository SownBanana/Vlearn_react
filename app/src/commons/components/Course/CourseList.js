import React from 'react'
import {
    Box,
    Grid,
    Typography,
} from '@material-ui/core';
import CourseItem from 'features/Course/components/Course/CourseItem';
import { Skeleton } from '@material-ui/lab'
import { Statuses } from 'commons/enums/status';

export default function CourseList({
    courses,
    title = 'Khóa học',
    loadStatus = 'success'
}) {
    return (
        <Box>
            <Typography style={{
                textAlign: "left", marginTop: 10, marginBottom: 10
            }} variant="body1" color="textSecondary">{title}</Typography>
            <Grid
                md={12}
                container
                spacing={4}
                direction="row"
                justify="flex-start"
                alignItems="center"
                alignContent="center"
            >
                {
                    loadStatus === Statuses.WAITING || loadStatus === Statuses.LOADING ?
                        (
                            Array(4).fill(
                                <Grid item md={3} sm={4} xs={12}>
                                    <Box>
                                        <Skeleton variant="rect" width="100%" height={200} />
                                        <Skeleton />
                                        <Skeleton width="60%" />
                                    </Box>
                                </Grid>
                            )
                        ) :
                        courses && courses.length > 0 ?
                            courses.map((course) => {
                                return (
                                    <Grid item md={3} sm={4} xs={12} key={course.id} >
                                        <Box>
                                            <CourseItem course={course} />
                                        </Box>
                                    </Grid>
                                );
                            }) :
                            <Typography style={{ margin: "auto" }} variant="subtitle2" color="textSecondary">Không có dữ liệu</Typography>
                }
            </Grid>
        </Box>
    )
}
