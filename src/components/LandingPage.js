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
                <div>
                    <h1>Welconme to BudgetManager</h1>
                    <h3>get your finances in order!</h3>
                    <div>
                        <SignupPage />
                    </div>
                </div>
            }
        </>
    )
}

export default LandingPage;