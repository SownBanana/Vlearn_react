import { Box, Grid, makeStyles } from '@material-ui/core'
import BreadCrumbs from 'commons/components/BreadCrumbs'
import React from 'react'
import { useParams } from 'react-router';

export default function Info() {
    const classes = useStyles();
    const { username } = useParams();

    return (
        <Box mt={2}>
            <BreadCrumbs current="Thông tin cá nhân">
                
            </BreadCrumbs>
            <Box mx={2}>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="space-evenly"
                >
                    <Grid container item md={4} direction="column" justify="flex-start" className={classes.space}>
                        {username}
                    </Grid>
                    <Grid direction="column" container item md={7} className={classes.space}>

                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
const useStyles = makeStyles((theme) => ({
    space: {
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "black 1px 1px 6px -3px",
        marginBottom: theme.spacing(2)
    },
}));
