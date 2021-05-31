import React from 'react'
import {
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    ListItem,
    Paper,
    Tooltip,
    Typography
} from '@material-ui/core'
import { LIVE_LESSON } from 'commons/enums/LearnView'
import { formatBytes } from 'commons/functions/formatBytes'
import { useDispatch, useSelector } from 'react-redux'
import { Close, CloudUpload } from '@material-ui/icons'
import { makeToast } from 'features/Toast/toastSlices'
import { deleteResource, uploadResource } from '../learnSlice'
import { UserRole } from 'features/Authenticate/constance'
import { fromTimeString } from 'commons/functions/humanTime'
import ConfirmIconButton from 'commons/components/Button/ConfirmIconButton'

export default function ClassResource({ lesson, type }) {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const handleFileUpload = async (e) => {
        console.log(e.target.files)
        const files = e.target.files;
        dispatch(uploadResource({
            files,
            type,
            lesson_id: lesson.id
        }))
    }
    return (
        <Box height={{ xs: "69vh", md: "50vh" }} px={{ xs: 0, md: 2 }} style={{ overflowY: 'scroll' }}>
            <Paper>
                {
                    (user.role === UserRole.INSTRUCTOR || type === LIVE_LESSON) &&
                    <Box display="flex" width="100%" p={1} justifyContent="flex-end">
                        <input
                            accept="*/*"
                            style={{ display: "none" }}
                            id={"icon-button-file-lesson-upload"}
                            type="file"
                            onChange={handleFileUpload}
                            multiple />
                        <Button variant="contained" size="small" color="primary" style={{ margin: 0 }}>
                            <label htmlFor={"icon-button-file-lesson-upload"}>
                                <CloudUpload />
                            </label>
                        </Button>
                    </Box>
                }
                <Divider />
                {
                    lesson.assets.map(asset => {
                        return (
                            <div>
                                <ListItem key={`asset-${asset.id}`} button
                                    onClick={() => window.open(asset.url, '_blank').focus()}
                                >
                                    <Grid container direction="row">
                                        <Grid item xs="4">
                                            <Tooltip title={asset.owner.name} placement="top">
                                                <Typography variant="body2" color="initial" style={{ fontWeight: "bold" }}>{asset.name}</Typography>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs="3">
                                            <Typography variant="body2" color="initial">{fromTimeString(asset.updated_at)}</Typography>
                                        </Grid>
                                        <Grid item xs="2">
                                            <Typography variant="body2" color="initial">{asset.type}</Typography>
                                        </Grid>
                                        <Grid item xs="2">
                                            <Typography variant="body2" color="initial">{formatBytes(asset.size)}</Typography>
                                        </Grid>
                                        <Grid item xs="1">
                                            <Box display="flex" justifyContent="center">
                                                {
                                                    user.id === asset.owner_id &&
                                                    <ConfirmIconButton
                                                        size="small"
                                                        onClick={() => {
                                                            dispatch(deleteResource({
                                                                id: asset.id,
                                                                type,
                                                                lesson_id: lesson.id
                                                            }))
                                                        }}
                                                        message={"Bạn thực sự muốn xóa tài liệu này?"}
                                                    >
                                                        <Close fontSize="small" />
                                                    </ConfirmIconButton>
                                                }
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                            </div>
                        )
                    })
                }
            </Paper>
        </Box >
    )
}
