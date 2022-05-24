import { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { DataContext } from "../context/data.context";
import Chart from 'chart.js/auto';


function ExpensesChart() {
    const { statements } = useContext(DataContext);



    const formattedData = [...statements]?.map(item => {
        const date = new Date(item.startDate);
        return {
            month: date.getMonth() + 1,
            amount: item.amount,
            regularity: item.regularity,
            type: item.type
        }
    })


    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const filterExpenses = [...formattedData]?.filter(statements => statements.type === "expense")


    const onceResult = {};
    const monthlyResult = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0
    };


    filterExpenses.forEach(item => {
        if (item.regularity === "once") {
            if (onceResult[item.month] === undefined) {
                onceResult[item.month] = item.amount;
            } else {
                onceResult[item.month] += item.amount;
            }

        }
        if (item.regularity === "monthly") {
            let actualMonth = currentMonth + 1;

            for (let i = item.month; i <= actualMonth; i++) {
                monthlyResult[i] += item.amount;
            }


        }


    });


    const totalExpenses = Object.entries(onceResult).reduce((acc, [key, value]) =>
        ({ ...acc, [key]: (acc[key] || 0) + value })
        , { ...monthlyResult });


    const totalArr = Object.values(totalExpenses)
    console.log(totalArr)

    return (
        <div className="chart">
            <h1>Expenses Chart</h1> <br />
            <div style={{ maxWidth: "800px" }}>
                <Bar
                    data={{
                        labels: ["Jan", "Feb", "Mar", "Apri", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        datasets: [
                            {
                                label: "Expenses",
                                data: totalArr,
                                backgroundColor: ["aqua"],
                                borderColor: ["black"],
                                borderWidth: 2,
                            },
                            {
                                label: "income",
                                data: [2000, 2500, 1900, 1000, 2300],
                                backgroundColor: ["brown"],
                                borderColor: ["black"],
                                borderWidth: 2,
                            },
                        ],
                    }}

                />
            </div>
        </div>
    );
}
export default ExpensesChart;