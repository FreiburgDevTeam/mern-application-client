import Balance from "./Balance";
import ExpensesChart from "./ExpensesChart"
import StatementList from "./StatementList";


function Dashboard() {

    return(
        <>
            <h1>This is Dashboard Component</h1>
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