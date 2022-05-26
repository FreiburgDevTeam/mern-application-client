import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { NavLink } from "react-router-dom";
import { Box, Button, Divider, Drawer, Link, List } from "@mui/material";
import '../index.css';


function NavBar() {
    const { logOutUser, user } = useContext(AuthContext);

    return (
        <Drawer
            PaperProps={{
                sx: {
                    width: 240,
            backgroundColor: '#EFE7DA',
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
                        <h1>BudgetManager</h1>
                        <br />
                            <h3>Welcome, {user.username}</h3>
                            <br />

                            <Button onClick={logOutUser} variant="contained" color='primary' >
                                Logout
                            </Button>


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
                                justifyContent: 'space-between',
                                px: 3,
                                py: '11px',
                                borderRadius: 1
                            }}>
                                <NavLink to="/dashboard">Dashboard</NavLink> <br />
                                <NavLink to="/userprofile">User Profile</NavLink> <br />
                                <NavLink to="/statements">Statements</NavLink> <br />
                                <NavLink to="/statements/create">+New</NavLink>
                            </Box>
                        </>
                }
            </List>
        </Drawer>
    )
}

export default NavBar;