import Balance from "./Balance";
import NavBar from "./NavBar";
import StatementList from "./StatementList";
import StatementsChart from "./SatatementsChart";
import Title from "./Title";

function Dashboard() {
    return (
        <>
            {
                <div>
                    <NavBar />
                    <section className="main-container">
                    <Title>Dashboard</Title>
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

