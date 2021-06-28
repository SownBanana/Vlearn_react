import { Box, Typography } from '@material-ui/core'
import { getTimePastText } from 'commons/functions/timePast'
import React from 'react'

export default function NewAnnouncementNotification({ notification, history }) {
    return (
        <Box onClick={(e) => {
            history.push(`/announcements/${notification.announcement.id}`)
        }}>
            <Box display="flex" flexWrap="wrap">
                <Box >
                    {notification.announcement.title}
                </Box>
            </Box>
            <Typography color="textSecondary" variant="caption">
                {getTimePastText(new Date(notification.timestamp))}
            </Typography>
        </Box >
    )
}
