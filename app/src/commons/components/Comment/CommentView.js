import { Grid } from '@material-ui/core'
import React from 'react'
import CommentBox from './CommentBox'
import CommentLog from './CommentLog'

export default function CommentView() {
    const sendComment = (comment) => {

    }
    return (
        <Grid container direction="column">
            <CommentLog comments={[]} />
            <CommentBox sendComment={sendComment} />
        </Grid>
    )
}
