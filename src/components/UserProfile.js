
import Spinner  from "reactjs-simple-spinner";
import NavBar from "./NavBar";
import React, { Component } from 'react';

function UserProfile (props) {
    

    const userDetails = () => {
            return (
                <div>
                    <p>Username: {props.user.username}</p> 
                    <p>E-Mail: {props.user.email}</p>
                </div>
            )
    }

    return (
        <div>
            <NavBar/>
            <h1>Account details</h1>

            { props.user == null
                    ? <Spinner 
                    size="big" 
                    message="Loading..." 
                    lineFgColor="#26ec0c"
                    line-bg-color="#1240be62"
                    speed={1}/>
                    : userDetails()
                  
                }

    
        </div>
    )
}

export default UserProfile;