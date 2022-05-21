import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import Balance from "./Balance";
import ExpensesChart from "./ExpensesChart"
import NavBar from "./NavBar";
import StatementList from "./StatementList";


function Dashboard() {
   const  [statement, setStatement] = useState([])

    const { isLoggedIn, user} = useContext(AuthContext);

    const storedToken = localStorage.getItem("authToken");
   

    useEffect(() => {
            axios.get(`${process.env.REACT_APP_API_URL}/statements`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
            )
           
            .then(response => {
                
                setStatement(response.data)
            })
            .catch(e => console.log("error getting projects from API...", e))
    }, [])


    return (
        <>
            {isLoggedIn
                ?
                <>
                    <h1>This is Dashboard Component</h1>
                    <NavBar />
                    <Balance />
                    <ExpensesChart />
                    <StatementList statements={statement}/>
                </>
                :
                <h3>Authorization required. Please <a href="/login">login</a> to access this page.</h3>
            }
        </>
    )
}
export default Dashboard;