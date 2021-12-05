import { List, ListItem, Box, ListItemButton, ListItemIcon, IconButton, ListItemText } from "@mui/material"
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import WorkIcon from '@mui/icons-material/Work';

import React, { useState } from 'react';
import { routerPathProtectedUser } from "../router/RouterPath";
import { useHistory } from "react-router";

//#388e3c = มีข้อมูล , #d32f2f = ไม่มีข้อมูล

function TabDataProfiles() {

    const history = useHistory()

    const [menu] = useState([
        { name: "ข้อมูลโปรไฟล์ของคุณ", icon: <PersonIcon /> , link : routerPathProtectedUser.Profile },
        { name: "ประวัติการศึกษา", icon: <SchoolIcon /> , link : routerPathProtectedUser.Education},
        { name: "ประสบการณ์ทำงาน", icon: <WorkIcon /> , link : routerPathProtectedUser.Workexperience},
        { name: "ประวัติการฝึกอบรม", icon: <ModelTrainingIcon /> , link : routerPathProtectedUser.Training},
    ])
    return (
        <Box sx={{ flexGrow: 1, maxWidth: 300 }}>
            {
                menu.map(({ name, icon , link }) => (
                    <List>
                        <ListItem
                            disablePadding
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => history.push(link)}>
                                    <EditIcon />
                                </IconButton>
                            }
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={`${name}`} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                ))
            }

        </Box>
    )
}

export default TabDataProfiles