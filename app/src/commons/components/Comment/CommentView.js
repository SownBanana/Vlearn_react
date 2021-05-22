import { Grid } from '@material-ui/core'
import { rateCourse } from 'features/Course/courseSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import CommentBox from './CommentBox'
import CommentLog from './CommentLog'

export default function CommentView({ course, content, commentable = true }) {
    const dispatch = useDispatch();
    const sendComment = (comment) => {
        dispatch(rateCourse({
            course_id: course.id,
            comment
        }))
    }
    return (
        <Grid container direction="column">
            {commentable && <CommentBox content={content} sendComment={sendComment} />}
            <CommentLog students={course.students} />
        </Grid>
    )
}
