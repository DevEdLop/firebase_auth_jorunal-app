import {
    Divider,
    Drawer,
    List,
    Toolbar,
    Typography
} from "@mui/material"
import { Box } from "@mui/system"
import { useSelector } from "react-redux"
import { SideBarItem } from "./sideBarItem"

export const SideBar = ({ draweWidth }) => {

    const { displayName } = useSelector(state => state.auth)
    const { notes } = useSelector(state => state.journal)
    
    return (
        <Box
            component="nav"
            sx={{
                width: {
                    sm: draweWidth
                },
                flexShrink: {
                    sm: 0
                }
            }}
        >

            <Drawer
                variant="permanent" // temporary
                open
                sx={{
                    display: {
                        xs: 'block'
                    },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: draweWidth
                    }
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        align="center"
                    >
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map(note => (
                            < SideBarItem key = { note.id } { ...note } />
                        ))
                    }
                </List>
            </Drawer>

        </Box>
    )
}
