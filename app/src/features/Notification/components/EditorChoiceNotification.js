import { Box, Typography } from '@material-ui/core'
import { getTimePastText } from 'commons/functions/timePast'
import { CourseStatus } from 'features/Course/constance'
import React from 'react'

export default function EditorChoiceNotification({ notification, history }) {
    return (
        <Box onClick={(e) => {
            history.push(`/courses/${notification.course.id}`)
        }}>
            <Box display="flex" flexWrap="wrap">
                <Box>
                    {`Khóa học\xa0`}
                </Box>
                <Box fontWeight="bold">
                    {notification.course.title}
                </Box>
                <Box>
                    {`\xa0của bạn đã\xa0`}
                </Box>
                {
                    notification.course.is_editor_choice ?
                        <>
                            <Box>
                                {`được lựa chọn là\xa0`}
                            </Box>
                            <Box fontWeight="fontWeightBold" color="success.main">
                                Editor's Choice
                            </Box>
                        </>
                        : <>
                            <Box>
                                {`bị bỏ lựa chọn là\xa0`}
                            </Box>
                            <Box fontWeight="fontWeightBold" color="error.main">
                                Editor's Choice
                            </Box>
                        </>
                }
            </Box>
            <Typography color="textSecondary" variant="caption">
                {getTimePastText(new Date(notification.timestamp))}
            </Typography>
        </Box >
    )
}
