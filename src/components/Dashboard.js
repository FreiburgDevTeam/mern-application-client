import Balance from "./Balance";
import StatementList from "./StatementList";
import StatementsChart from "./StatementsChart";
import Title from "./Title";

function Dashboard() {
    return (
        <>
            {
                <div>
                    <section className="main-container">
                    <Title>Dashboard</Title><br />
                        <div className="flex-row">
                            <Balance />
                            <StatementsChart />
                        </div>
                        <StatementList />
                    </section>

                </div>
            }
        </>
    )
}
export default Dashboard;

