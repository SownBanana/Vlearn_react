import React, { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import CKEditor from "commons/components/CKEditor/CKEditor";
import { useLocation, useParams } from "react-router-dom";
import { Box, Button, Grid } from "@material-ui/core";
import BreadCrumbs from "commons/components/BreadCrumbs";
import { setContentEditMode } from "features/Course/editingCourseSlice";

export default function ContentEdit() {
    const dispatch = useDispatch();
    const { content, handler } = useSelector((state) => state.editorModal);
    return (
        <Grid item xs={12} container direction="column" justify="flex-start">
            <Grid item xs={12} style={{ textAlign: "left", marginBottom: "10px", marginRight: "10px" }}>
                <Button variant="contained" color="primary"
                    onClick={() => dispatch(setContentEditMode(false))}
                >
                    Quay lại
                </Button>
            </Grid>
            <Grid item xs={12}>
                <CKEditor content={content} handler={handler} />
            </Grid>
        </Grid>
    );
}
