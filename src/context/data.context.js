import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth.context";

const DataContext = createContext();

function DataProviderWrapper (props) {
    const {isLoggedIn} = useContext(AuthContext);
    const [statements, setStatements] = useState(null);

    useEffect(() => {
        if (isLoggedIn){
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${process.env.REACT_APP_API_URL}/statements`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then(response => {
    
                setStatements(response.data)
            })
            .catch(e => console.log("error getting projects from API...", e))
        }
    },[statements, isLoggedIn])
    
    return (
        <DataContext.Provider value={{ statements, setStatements }}>
            {props.children}
        </DataContext.Provider>
    )
}

export { DataContext, DataProviderWrapper };
