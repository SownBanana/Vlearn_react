import { Box, Typography } from '@material-ui/core'
import { getTimePastText } from 'commons/functions/timePast'
import { CourseStatus } from 'features/Course/constance'
import React from 'react'

export default function CourseStatusNotification({ notification, history }) {
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
                    notification.course.status === CourseStatus.DRAFT ?
                        <>
                            <Box>
                                {`đưa về trạng thái\xa0`}
                            </Box>
                            <Box fontWeight="fontWeightBold" color="warning.main">
                                Nháp
                            </Box>
                        </>
                        : notification.course.status === CourseStatus.REJECTED ?
                            <>
                                <Box>
                                    {`bị\xa0`}
                                </Box>
                                <Box fontWeight="fontWeightBold" color="secondary.main">
                                    Từ chối
                                </Box>
                            </>
                            : notification.course.status === CourseStatus.REVIEWING ?
                                <>
                                    <Box>
                                        {`đưa về trạng thái\xa0`}
                                    </Box>
                                    <Box fontWeight="fontWeightBold" color="primary.main">
                                        Đang duyệt
                                    </Box>
                                </>

                                : notification.course.status === CourseStatus.PUBLISH ?
                                    <>
                                        <Box>
                                            {`được\xa0`}
                                        </Box>
                                        <Box fontWeight="fontWeightBold" color="success.main">
                                            Xuất bản
                                        </Box>
                                    </>
                                    : ''
                }
            </Box>
            <Typography color="textSecondary" variant="caption">
                {getTimePastText(new Date(notification.timestamp))}
            </Typography>
        </Box>
    )
}
