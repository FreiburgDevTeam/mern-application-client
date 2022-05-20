import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { NavLink } from "react-router-dom";


function NavBar() {
    const { isLoggedIn, isLoading, user, logOutUser } = useContext(AuthContext);

    return (
        <div className="sidebar">
            <h1>BudgetManager</h1>
            {!isLoggedIn &&
                <>
                    <NavLink to="/signup">Register</NavLink> |
                    <NavLink to="/login">Login</NavLink>
                </>
            }
            {isLoggedIn &&
                <>
                    <h3>Welcome, {user.email}!</h3>
                    <button onClick={logOutUser}>Logout</button>

                    <div>
                        <NavLink to="/dashboard">Dashboard</NavLink> <br />
                        <NavLink to="/userprofile">User Profile</NavLink> <br />
                    </div>

                    <div>
                        <NavLink to="/statements">Statements</NavLink> <br />
                        <NavLink to="/statements/create">+New</NavLink>
                    </div>
                </>
            }




        </div>
    )
}

export default NavBar;