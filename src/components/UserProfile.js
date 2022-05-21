
import NavBar from "./NavBar";

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
                    ? <p>loading...</p>
                    : userDetails()
                  
                }

    
        </div>
    )
}

export default UserProfile;