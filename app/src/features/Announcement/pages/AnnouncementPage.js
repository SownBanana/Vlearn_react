import React, { useEffect } from 'react'
import {
    Box,
    Typography,
    Container,
    Paper
} from '@material-ui/core';
import BreadCrumbs from 'commons/components/BreadCrumbs';
import CKViewer from 'commons/components/CKEditor/CKViewer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get } from '../announcementSlice';
import { getTimePastText } from 'commons/functions/timePast';

export default function AnnouncementPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const announcement = useSelector(state => state.announcement.announcement)
    useEffect(() => {
        dispatch(get(id))
    }, [dispatch, id])
    return (
        <Box mt={2}>
            <BreadCrumbs mb={2} current={`Thông báo / ${announcement.title}`}>
            </BreadCrumbs>
            <Container maxWidth="md">
                <Paper>
                    <Box px={4} py={2}>
                        <Box>
                            <Typography align="center" variant="h4" color="textPrimary">{announcement.title}</Typography>
                        </Box>
                        <Box>
                            <Typography align="right" variant="body2" color="textSecondary">{getTimePastText(new Date(announcement.created_at))}</Typography>
                        </Box>
                        <CKViewer style={{ overflow: "hidden" }} content={announcement.content} />
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}
