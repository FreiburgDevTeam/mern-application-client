import { NavLink } from "react-router-dom";

function NavBar () {


    return (
        <div className="sidebar">
            <h1>BudgetManager</h1>

                <div>
            <h3>Dashboard</h3>
            <NavLink to="#">User Profile</NavLink>
            </div>
            
            <div>
            <h3>Statement</h3>
            <NavLink to="#">+New</NavLink>
            </div>
        </div>
    )
}

export default NavBar;