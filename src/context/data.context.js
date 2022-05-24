import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth.context";

const DataContext = createContext();


function DataProviderWrapper(props) {
    const [statements, setStatements] = useState([]);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (isLoggedIn) {
        updateData()
    }
    }, [isLoggedIn])

    const updateData = () => {
        
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${process.env.REACT_APP_API_URL}/statements`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then(response => {

                setStatements(response.data)
            })
            .catch(e => console.log("error getting projects from API...", e));
        
    }

    return (
        <DataContext.Provider value={{ statements, setStatements, updateData }}>
            {props.children}
        </DataContext.Provider>
    )
}

export { DataContext, DataProviderWrapper };
