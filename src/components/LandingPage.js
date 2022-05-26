import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import SignupPage from "./SignupPage";
import { useNavigate } from "react-router-dom";

function LandingPage() {

    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>
            {isLoggedIn
                ? navigate("/dashboard")
                :
                        <SignupPage />

            }
        </>
    )
}

export default LandingPage;