import Balance from "./Balance";
import NavBar from "./NavBar";
import StatementList from "./StatementList";
import StatementsChart from "./SatatementsChart";

function Dashboard() {
    return (
        <>
            {
                <>
                    <h1>This is Dashboard Component</h1>
                    <NavBar />
                    <Balance />
                    <StatementsChart />
                    <StatementList />
                </>
            }
        </>
    )
}
export default Dashboard;

