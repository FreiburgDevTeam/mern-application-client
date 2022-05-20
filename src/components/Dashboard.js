import Balance from "./Balance";
import ExpensesChart from "./ExpensesChart"
import NavBar from "./NavBar";
import StatementList from "./StatementList";


function Dashboard() {

    return(
        <>
            <h1>This is Dashboard Component</h1>
            <NavBar />
            <hr />
            <Balance />
            <hr />
            <ExpensesChart />
            <hr />
            <StatementList />
        </>
    )
}
export default Dashboard;