import React, { useState } from 'react'
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
import { withStyles, IconButton, Button } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { useHistory } from 'react-router';
import moment from 'moment';


export default function Schedule({
    schedules,
    resources,
    mainResourceName
}) {

    const [currentDate, setCurrentDate] = useState(moment())

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

    return (
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
    );
}