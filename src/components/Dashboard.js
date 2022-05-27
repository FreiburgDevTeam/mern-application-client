import Balance from "./Balance";
import StatementList from "./StatementList";
import StatementsChart from "./StatementsChart";
import Title from "./Title";

function Dashboard() {
    return (
        <>
            {
                <div>
                    <Title>Dashboard</Title><br />
                        <div className="flex-row head-container">
                            <Balance />
                            <StatementsChart />
                        </div>
                        <StatementList />
                </div>
            }
        </>
    )
}
export default Dashboard;

