import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import LandingPage from "./LandingPage";
import Spinner from "reactjs-simple-spinner";

function IsPrivate({ children }) {

    const { isLoggedIn, isLoading } = useContext(AuthContext);

    // If the authentication is still loading 
    if (isLoading) {
        return <Spinner />
    } else if (!isLoggedIn) {
        // If the user is not logged in 
        return (
            <>
                <h3>Authorization required. Please signup or login to access this page.</h3>
                <LandingPage />
            </>
        )
    } else {
        // If the user is logged in, allow to see the page 
        return children;
    }
}

export default IsPrivate;
