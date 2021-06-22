import { Box, Divider, Grid, List, ListItem, makeStyles, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab';
import React from 'react'

export default function CommentLog({ students }) {
    const classes = useStyles();
    return (
        <Grid item md={12} className={classes.commentSpace}>
            <List className={classes.chatBackground} component="nav" aria-label="main mailbox folders">
                {students && students.map(student => {
                    const rating = student.pivot
                    if (rating.rate !== null)
                        return (
                            <div>
                                <ListItem button>
                                    <Box my={2}>
                                        <Grid container spacing={1} direction="column">
                                            <Typography variant="subtitle2" style={{ fontWeight: "bold" }} color="textPrimary">{student.name}</Typography>
                                            <Rating size="small" value={rating.rate} readOnly={true} />
                                            <Typography variant="subtitle2" color="textSecondary">{rating.comment}</Typography>
                                        </Grid>
                                    </Box>
                                </ListItem>
                                <Divider />
                            </div>
                        )
                    else return <span></span>
                })}
            </List>
        </Grid>
    )
}
const useStyles = makeStyles((theme) => ({
    chatBackground: {
        // backgroundColor: "aliceblue",
    },
    commentSpace: {
        backgroundColor: "white",
        borderRadius: "2px",
        boxShadow: "black 1px 1px 6px -3px",
        overflowY: "auto",
        minHeight: "10vh",
        maxHeight: "66vh",
        marginBottom: theme.spacing(0),
        marginTop: theme.spacing(2),
    },
}));
