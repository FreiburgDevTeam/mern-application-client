import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function SignupPage(props) {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        
        const requestBody = { username, email, password };

        axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
            .then((response) => {
                navigate('/login');
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                console.log("error creating account", errorDescription)
                setErrorMessage(errorDescription);
            })
    };


    return (
        <div className="SignupPage">
            <br />
            <h1>Signup</h1>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSignupSubmit}>
            <label>Name:</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    required={true}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <br />
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />


                <br/><button type="submit">Sign Up</button>
            </form>

            <p>Already have an account? <Link to={"/login"}> Login</Link></p>
        
        </div>
    )
}

export default SignupPage;