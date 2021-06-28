import React from 'react'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { Tooltip } from "@material-ui/core";

export default function EditorChoiceIcon() {
    return (
        <Tooltip title="Editor's Choice" placement="top">
            <VerifiedUserIcon
                style={{
                    marginLeft: 3,
                    fontSize: 14,
                    color: 'green',
                }} />
        </Tooltip>
    )
}
