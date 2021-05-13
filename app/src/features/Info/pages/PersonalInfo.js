import { Box } from '@material-ui/core'
import BreadCrumbs from 'commons/components/BreadCrumbs'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router';

export default function PersonalInfo() {
    const { username } = useParams();
    return (
        <Box mt={2}>
            <BreadCrumbs current="Thông tin cá nhân">
            </BreadCrumbs>
            <Box mx={2}>
                {username}
            </Box>
        </Box>
    )
}
