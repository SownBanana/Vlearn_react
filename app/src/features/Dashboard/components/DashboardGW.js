import { Box } from '@material-ui/core'
import { UserRole } from 'features/Authenticate/constance'
import React from 'react'
import { useSelector } from 'react-redux'
import InstructorDashboard from '../pages/Instructor/InstructorDashboard'
import StudentDashboard from '../pages/Student/StudentDashboard'

export default function DashboardGW() {
    const role = useSelector(state => state.auth.user.role)
    return (
        <Box mt={2}>
            {
                role === UserRole.STUDENT ?
                    <StudentDashboard />
                    : role === UserRole.INSTRUCTOR ?
                        <InstructorDashboard />
                        : <span></span>
            }
        </Box>
    )
}
