import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Appointments,
    AppointmentTooltip,
    DateNavigator,
    TodayButton,
    Toolbar,
    Resources,
    ViewSwitcher,
    MonthView,
    DayView
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedules } from './instructorDashSlice';
import { Box, MenuItem, Select, Typography, Button, withStyles, Grid, IconButton, FormControl } from '@material-ui/core';
import BreadCrumbs from 'commons/components/BreadCrumbs';
import { ImportContacts, Visibility } from '@material-ui/icons';
import { useHistory } from 'react-router';

export default function InstructorDashboard() {

    const [currentDate, setCurrentDate] = useState(moment())
    const schedules = useSelector(state => state.dashInstructor.schedules)
    const courseResources = useSelector(state => state.dashInstructor.courseResources)
    const sectionResources = useSelector(state => state.dashInstructor.sectionResources)
    const dispatch = useDispatch()
    const id = useSelector(state => state.auth.user.id)
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

    const history = useHistory();

    const currentDateChange = (currentDate) => { setCurrentDate(currentDate); };


    const style = ({ palette }) => ({
        commandButton: {
            backgroundColor: 'rgba(255,255,255,0.65)',
        },
    });

    const Header = withStyles(style, { name: 'Header' })(({
        children, appointmentData, classes, ...restProps
    }) => (
        <AppointmentTooltip.Header
            {...restProps}
            appointmentData={appointmentData}
        >
            <IconButton
                /* eslint-disable-next-line no-alert */
                onClick={() => history.push(`/courses/learn/${appointmentData.course}`)}
                className={classes.commandButton}
            >
                <Visibility />
            </IconButton>
        </AppointmentTooltip.Header>
    ));
    const Today = withStyles(style, { name: 'Today' })(({
        children, classes, ...restProps
    }) => (
        <TodayButton.Button
            getMessage={(mss) => "hôm nay"}
            setCurrentDate={(nextDate) => setCurrentDate(nextDate)}
            color="primary"
        />
    ));

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
                <Paper>
                    <Scheduler
                        data={schedules}
                        height={520}
                        locale={'vi-VI'}
                    >
                        <ViewState
                            currentDate={currentDate}
                            onCurrentDateChange={currentDateChange}
                            defaultCurrentViewName="Week"
                        />
                        <DayView
                            displayName="Ngày"
                            startDayHour={1}
                            endDayHour={24}
                        />
                        <WeekView
                            displayName="Tuần"
                            startDayHour={1}
                            endDayHour={24}
                        />
                        <MonthView
                            displayName="Tháng"
                        />
                        <Toolbar />
                        <ViewSwitcher />
                        <DateNavigator />
                        <TodayButton buttonComponent={Today} />
                        <Appointments />
                        <AppointmentTooltip
                            showCloseButton
                            headerComponent={Header}
                        />
                        <Resources
                            data={resources}
                            mainResourceName={mainResourceName}
                        />
                    </Scheduler>
                </Paper>
            </Box>

        </Box>

    );
}