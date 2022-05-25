import { NavLink } from "react-router-dom";

function ErrorPage () {

    return (
        <div>
            <h1>Oops!</h1>
            <h2>404 - PAGE NOT FOUND</h2>
            <h6>We are sorry, but the Page you requestet was not found </h6>
            <NavLink to='/dashboard'>Dashboard/Login</NavLink>
        </div>
    )
}

export default ErrorPage;