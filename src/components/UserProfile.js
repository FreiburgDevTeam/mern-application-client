
import Spinner from "reactjs-simple-spinner";
import NavBar from "./NavBar";
import React, { useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import UserAvatar from "../img/user-avatar.svg";
import Title from "./Title";

function UserProfile() {
    const { user } = useContext(AuthContext);
    console.log (user)

    const userDetails = () => {
        return (
            <div>
            <Title>Account Details</Title>
            <br />
            <img src={UserAvatar} alt="user" /><br /><br />
            <p>username:</p>
                <h2>{user.username}</h2>
                <br />
                <p>email:</p>
                <h2>{user.email}</h2>
            </div>
        )
    }

    return (
        <div className="user-profile">
            <NavBar />
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