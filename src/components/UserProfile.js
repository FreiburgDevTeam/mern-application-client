
import Spinner from "reactjs-simple-spinner";
import NavBar from "./NavBar";
import React, { useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import GetMonthlyData from "./GetMonthlyData";

function UserProfile() {
    const { user } = useContext(AuthContext);

    const userDetails = () => {
        return (
            <div>
                <p>Username: {user.username}</p>
                <p>E-Mail: {user.email}</p>
            </div>
        )
    }

    return (
        <div>
            <NavBar />
            <GetMonthlyData />
            <h1>Account details</h1>
            {!user
                ? <Spinner
                    size="big"
                    message="Loading..."
                    lineFgColor="#26ec0c"
                    line-bg-color="#1240be62"
                    speed={1} />
                : userDetails()

            }
        </div>
    )
}

export default UserProfile;