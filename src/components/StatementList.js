import Spinner  from "reactjs-simple-spinner";

function StatementList(props) {

    const renderStatements = () => {
        const list = props.statements.map ( (e) => {
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


    return(
        <>
            <h1>This is StatementList Component</h1>
            <div>
                {props.statements === null
                    ? <Spinner />
                    : renderStatements()
                }

            </div>

        </>
    )
}
export default StatementList;