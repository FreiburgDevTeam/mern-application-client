import Balance from "./Balance";
import NavBar from "./NavBar";
import StatementList from "./StatementList";
import StatementsChart from "./StatementsChart";
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
                        <div className="statements-container">
                        <StatementList/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Dashboard;

