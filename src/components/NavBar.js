import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { NavLink } from "react-router-dom";
import { Box, Button, Divider, Drawer, Link, List } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import Title from "./Title";
import UserAvatar from "../img/user-avatar.svg"


function NavBar() {
    const { logOutUser, user } = useContext(AuthContext);

    return (
        <Drawer
            PaperProps={{
                sx: {
                    width: 240,
            backgroundColor: 'rgba(0, 12, 15, 0.4)',
            color: '#ffffff',
            overflow: 'hidden',
                }
            }}

            variant="permanent">
            <List>
                {
                    user === null
                        ? <p>Loading...</p>
                        :
                        <>
                        <br />
                        <Title>BudgetManager</Title>
                    
                            <Title>Welcome, {user.username}</Title>
                            <br />
                            <img className="user-avatar" src={UserAvatar} alt="user" /><br />
                            <Button onClick={logOutUser}><LogoutIcon/></Button>
                            <Divider
                                sx={{
                                    borderColor: '#c0c0c0',
                                    my: 3
                                }}
                            />
                            <Box sx={{
                                alignItems: 'center',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                justifyContent: 'space-evenly',
                                borderRadius: 1,
                                color: '#ffffff'
                            }}>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                                <NavLink to="/userprofile">User Profile</NavLink>
                                <NavLink to="/statements">Statements</NavLink>
                                <NavLink to="/statements/create">+New</NavLink>
                            </Box>
                        </>
                }
            </List>
        </Drawer>
    )
}

export default NavBar;