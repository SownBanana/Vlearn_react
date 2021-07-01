import React from 'react'
import {
    Box,
    Grid,
    Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab'
import { Statuses } from 'commons/enums/status';
import UserItem from 'commons/components/User/UserItem';

export default function UserList({
    users,
    title = 'Người dùng',
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
                                        <Skeleton variant="rect" width="100%" height={64} />
                                    </Box>
                                </Grid>
                            )
                        ) :
                        users && users.length > 0 ?
                            users.map((user) => {
                                return (
                                    <Grid item md={3} sm={4} xs={12} key={user.id} >
                                        <Box>
                                            <UserItem user={user} />
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
