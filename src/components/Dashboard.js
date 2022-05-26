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
                    <div className="flex-row">
                        <NavBar />
                        <div className=" main-container">
                            <div className="flex-row">
                                <Balance />
                                <StatementsChart />
                            </div>
                            <StatementList />
                        </div>
                    </div>
                </>
            }
        </>
    )
}
export default Dashboard;

