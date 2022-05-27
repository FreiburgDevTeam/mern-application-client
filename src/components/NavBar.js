import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { NavLink } from "react-router-dom";
import { Box, Button, Divider, Drawer, List, MenuItem, MenuList } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import Title from "./Title";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import UserAvatar from "../img/user-avatar.svg"
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Logo from '../img/Logo.png'

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
                            <div>
                                <img className="logoImg" src={Logo} />
                            </div>
                            <h1 className="logo">BudgetManager</h1>
                            <br />
                            <div className="welcome">
                            <h1>Welcome, {user.username}</h1>
                            <br />
                            </div>
                            <img className="user-avatar" src={UserAvatar} alt="user" /><br />
                            <Button onClick={logOutUser}><LogoutIcon /></Button>
                            <Divider
                                sx={{
                                    borderColor: '#c0c0c0',
                                    my: 3
                                }}
                            />
                            <Box sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                borderRadius: 1,
                            }}>
                                <MenuList>
                                    <MenuItem><DashboardIcon/><NavLink to="/dashboard"><Title>Dashboard</Title></NavLink></MenuItem><br />
                                    <MenuItem><AccountBoxIcon/><NavLink to="/userprofile"><Title>User Profile</Title></NavLink></MenuItem><br />
                                    <MenuItem><ListIcon/><NavLink to="/statements"><Title>Statements</Title></NavLink></MenuItem><br />
                                    <MenuItem><AddBoxIcon/><NavLink to="/statements/create"><Title>New</Title></NavLink></MenuItem>
                                </MenuList>
                            </Box>
                        </>
                }
            </List>
        </Drawer>
    )
}

export default NavBar;
