import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedules } from './instructorDashSlice';

import Schedule from 'features/Dashboard/components/Schedule';
import { Box, FormControl, MenuItem, Select, Typography, Grid } from '@material-ui/core';
import AreaChart from 'features/Dashboard/components/AreaChart';
import BreadCrumbs from 'commons/components/BreadCrumbs';
import moment from 'moment';

export default function InstructorDashboard() {

    const schedules = useSelector(state => state.dashInstructor.schedules)
    const courseResources = useSelector(state => state.dashInstructor.courseResources)
    const sectionResources = useSelector(state => state.dashInstructor.sectionResources)
    const [mainResourceName, setMainResourceName] = useState("section")

    const [resources, setResources] = useState([
        {
            fieldName: 'section',
            title: 'Chương học',
            instances: sectionResources,
        },
        {
            fieldName: 'course',
            title: 'Khóa học',
            instances: courseResources,
        },
    ])
    const dispatch = useDispatch()
    const id = useSelector(state => state.auth.user.id)


    const generateData = (n) => {
        const ret = [];
        let rating = 0;
        let sold = 0;
        const dt = new Date(moment());
        for (let i = 0; i < n; i += 1) {
            dt.setDate(dt.getDate() + 1);
            rating = Math.round((Math.random() * 5) * 10) / 10;
            sold = Math.round(Math.random() * 100 + Math.round(Math.random() * 90 + 10));
            ret.push({ time: new Date(dt), sold, rating });
        }
        return ret;
    };
    const chartData = generateData(100);

    useEffect(() => {
        console.log("reset rs")
        setResources([
            {
                fieldName: 'course',
                title: 'Khóa học',
                instances: courseResources,
            },
            {
                fieldName: 'section',
                title: 'Chương học',
                instances: sectionResources,
            },
        ])
    }, [courseResources, sectionResources])

    useEffect(() => {
        dispatch(fetchSchedules())
    }, [id])
    return (
        <Box >
            <BreadCrumbs
                current="Dashboard"
            >
                <Box mx={2} display="flex" justifyContent="flex-start" alignItems="center">
                    <Typography
                        style={{ marginRight: 5, fontWeight: "bold" }}
                        variant="subtitle1"
                        color="textSecondary">Nhóm theo: </Typography>
                    <FormControl variant="outlined" size="small">

                        <Select
                            value={mainResourceName}
                            onChange={e => setMainResourceName(e.target.value)}
                        >
                            {resources.map(resource => (
                                <MenuItem key={resource.fieldName} value={resource.fieldName}>
                                    {resource.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </BreadCrumbs>
            <Box mx={{ xs: 0, md: 2 }} >
                <Grid container spacing={0} direction="row" justify="flex-end">
                    <Box mb={2} mr={2}>
                        <AreaChart
                            width={400}
                            height={200}
                            data={chartData}
                            valueField={"rating"}
                            argumentField={"time"}
                            title={"Trung bình rating hàng tháng"}
                            titleSize={18}
                            color={"orange"}
                        />
                    </Box>
                    <Box mb={2} mr={2}>
                        <AreaChart
                            width={400}
                            height={200}
                            data={chartData}
                            valueField={"sold"}
                            argumentField={"time"}
                            title={"Số lượng mua khóa học hàng tháng"}
                            titleSize={18}
                        />
                    </Box>
                </Grid>
                <Schedule
                    schedules={schedules}
                    resources={resources}
                    mainResourceName={mainResourceName}
                />
            </Box>
        </Box>
    );
}