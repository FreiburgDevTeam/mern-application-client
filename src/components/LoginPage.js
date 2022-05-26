import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context"
import { DataContext } from "../context/data.context";
import { Button, Grid, TextField, Typography } from "@mui/material";
import image from "../img/hexagonbg.jpg"



function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);
    const { updateData } = useContext(DataContext);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password };

        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
            .then((response) => {
                const jwt = response.data.authToken;
                storeToken(jwt);
                authenticateUser();
                updateData();
                navigate('/dashboard');
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };

    return (
        <>
            <div id="bg" style={{ backgroundImage: `url(${image})` }}>
                <div className="centerSiLo" style={{ padding: 50 }}>

                    <Typography component="h1" variant="h2">

                        <h1>Welconme to Budget-Manager</h1>
                        <h3>get your finances in order!</h3>
                    </Typography>
                    <div style={{ padding: 50 }}>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                    </div>
                    {errorMessage && <p>{errorMessage}</p>}

                    <form onSubmit={handleLoginSubmit}>
                        <Grid>
                            <TextField
                                id="outlined-basic"
                                label="E-Mail Adress"
                                type="email"
                                name="email"
                                value={email}
                                required={true}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid><br />
                            <TextField
                                id="outlined-basic"
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
                                type="submit">Login</Button>
                        </Grid><br />
                    </form>
                    <p>Don't have an account? <Link color="primary" to={"/signup"}> Sign up now</Link></p>
                </div>
            </div>
        </>
    )
}

export default LoginPage;