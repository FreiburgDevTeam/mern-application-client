import Balance from "./Balance";
import StatementList from "./StatementList";
import StatementsChart from "./StatementsChart";

function Dashboard() {
    return (
        <>
            {
                <div>
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

