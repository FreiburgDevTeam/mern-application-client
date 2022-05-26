import Balance from "./Balance";
import NavBar from "./NavBar";
import StatementList from "./StatementList";
import StatementsChart from "./SatatementsChart";
import Title from "./Title";

function Dashboard() {
    return (
        <>
            {
                <>
                    <Title>Dashboard</Title>
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

