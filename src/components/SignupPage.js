import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context"
import { Avatar, Button, Grid, TextField } from "@mui/material";


function SignupPage(props) {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        
        const requestBody = { username, email, password };

        axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
            .then((response) => {
                const jwt = response.data.authToken;
                storeToken(jwt);
                authenticateUser();
                navigate('/dashboard');
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
            <Grid>
                <TextField
                    id="outlined-basic"
                    label="User"
                    type="text"
                    name="username"
                    value={username}
                    required={true}
                    onChange={(e) => setUserName(e.target.value)} 
                />
                </Grid>
                <br />
                <label></label>
                <TextField
                    id="outlined-basic"
                    label="E-Mail Adress"
                    type="email"
                    name="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label></label>
                <TextField
                    id="outlined-basic"
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />


                <br/><Button 

                 variant="contained"
                 color="primary"
                 type="submit"
                    >Sign Up</Button>
            </form>

            <p>Already have an account? <Link to={"/login"}> Login</Link></p>
        
        </div>
    )
}

export default SignupPage;