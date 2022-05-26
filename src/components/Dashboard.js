import Balance from "./Balance";
import NavBar from "./NavBar";
import StatementList from "./StatementList";
import StatementsChart from "./SatatementsChart";
import Title from "./Title";

function Dashboard() {
    return (
        <>
            {
                <div className="main-container">
                    <Title>Dashboard</Title>
                    <br />
                    <NavBar />
                    <div>
                        <div className="flex-row">
                            <Balance />
                            <StatementsChart />
                        </div>
                        <StatementList />
                    </div>
                </div>
            }
        </>
    )
}
export default Dashboard;

