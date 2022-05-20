import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Balance from "./Balance";
import ExpensesChart from "./ExpensesChart"
import NavBar from "./NavBar";
import StatementList from "./StatementList";


function Dashboard() {

    const { isLoggedIn} = useContext(AuthContext);

    return (
        <>
            {isLoggedIn
                ?
                <>
                    <h1>This is Dashboard Component</h1>
                    <NavBar />
                    <Balance />
                    <ExpensesChart />
                    <StatementList />
                </>
                :
                <h3>Authorization required. Please <a href="/login">login</a> to access this page.</h3>
            }
        </>
    )
}
export default Dashboard;