import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context"
import { Button, Grid, TextField, Typography } from "@mui/material";
import image from "../img/hexagonbg.jpg"

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
        <div id="bg" style={{ backgroundImage: `url(${image})` }}>
            <div className="centerSiLo" style={{ padding: 50 }}>

                <Typography component="h1" variant="h2">

                    <h1>Welconme to Budget-Manager</h1>
                    <h3>get your finances in order!</h3>
                </Typography>
                <div style={{ padding: 50 }}>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <form onSubmit={handleSignupSubmit}>
                    <Grid>
                        <TextField
                            id="username"
                            label="User"
                            type="text"
                            name="username"
                            value={username}
                            required={true}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </Grid>
                    <br />
                    <Grid>
                        <TextField
                            id="email"
                            label="E-Mail Adress"
                            type="email"
                            name="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <br />
                    <Grid>
                        <TextField
                            id="Password"
                            label="Password"
                            type="password"
                            name="password"
                            value={password}
                            required={true}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid><br />
                    <Grid>
                        <Button

                            variant="contained"
                            color="primary"
                            type="submit"
                        >Sign Up</Button>
                    </Grid>  <br />
                </form>

                <Grid item>
                    <p>Already have an account? <Link to={"/login"}> Login</Link></p>
                </Grid>
            </div>
        </div>
    )
}

export default SignupPage;