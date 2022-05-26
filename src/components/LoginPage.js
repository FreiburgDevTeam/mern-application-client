import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context"
import { DataContext } from "../context/data.context";
import { Button, TextField } from "@mui/material";

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
        <div className="LoginPage"><br />
            <h1>Login</h1>

            {errorMessage && <p>{errorMessage}</p>}

            <form onSubmit={handleLoginSubmit}>
                <label></label>
                <TextField
                    id="outlined-basic"
                    label="E-Mail Adress"
                    type="email"
                    name="email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)} 
                />

                <br /><label></label>
                <TextField
                    id="outlined-basic"
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                    <br/>
                <Button 
                variant="contained"
                color="primary"
                type="submit">Login</Button>
            </form>

            <p>Don't have an account? <Link color="primary" to={"/signup"}> Sign up now</Link></p>
           
        </div>
    )
}

export default LoginPage;