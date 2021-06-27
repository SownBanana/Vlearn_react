import { Box, Typography } from '@material-ui/core'
import { getTimePastText } from 'commons/functions/timePast'
import React from 'react'

export default function RateCourseNotification({ notification, history }) {
    return (
        <Box onClick={(e) => {
            history.push(`/courses/${notification.course.id}`)
        }}>
            <Box display="flex" flexWrap="wrap">
                <Box fontWeight="bold">
                    {notification.user.name}
                </Box>
                <Box>
                    {`\xa0đã đánh giá khóa học\xa0`}
                </Box>
                <Box fontWeight="bold">
                    {notification.course.title}
                </Box>
                <Box>
                    {`\xa0của bạn\xa0`}
                </Box>
                <Box fontWeight="bold">
                    {`${notification.course.rate} sao`}
                </Box>
            </Box>
            <Typography color="textSecondary" variant="caption">
                {getTimePastText(new Date(notification.timestamp))}
            </Typography>
        </Box>
    )
}
