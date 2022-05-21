import Spinner from "reactjs-simple-spinner";
import { DataContext } from "../context/data.context";
import { useContext } from "react";
import NavBar from "./NavBar";

function StatementList() {
    const { statements } = useContext(DataContext);

    const renderStatements = () => {
        const list = statements.map((e) => {
            return (
                <div key={e._id}>
                    ||
                    <h5>{e.title}</h5>
                    <p>{e.amount}</p>
                    <p>{e.type}</p>
                </div>
            )
        })
        return list;
    }

    return (
        <>
            <NavBar />
            <h1>This is StatementList Component</h1>
            <div>
                {statements === null
                    ? <Spinner />
                    : renderStatements()
                }
            </div>
        </>
    )
}
export default StatementList;