
import { Chart } from "chart.js/auto";
import { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { DataContext } from "../context/data.context";

function SatatementsChart() {
    const { statements, updateData} = useContext(DataContext);
    const currentDate = new Date();
    const currentYear = Number(currentDate.getFullYear());
    const [year, setYear] = useState(currentYear);

    useEffect(() => {
        updateData()
    }, [year])

    const formattedData = [...statements]?.map((item) => {
        const date = new Date(item.startDate);
        return {
            month: Number(date.getMonth() + 1),
            year: Number(date.getFullYear()),
            amount: item.amount,
            regularity: item.regularity,
            type: item.type
        }
    })

    function getPreviousAmount (type) {
        let previousData;
        if (year === (year - 1) || !formattedData){
            return previousData = 0;
        } else {
            previousData = formattedData.filter(item => {
                return item.year === (year -1) && item.regularity === "monthly" && item.type === type;
            });
            if (previousData.length === 1) {
                return previousData[0].amount;
            } else {
                let result = previousData?.reduce((previousValue, currentValue) =>  previousValue.amount + currentValue.amount, 0);
                return result;
            }
        }
    }

    const getMonthlyData = (type) => {
        const data = formattedData.filter(item => {
            return item.year === year && item.type === type;
        });

        let monthlyResult = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 };
        let onceResult = {};

        data.forEach(item => {
            if (item.regularity === "once") {
                if (onceResult[item.month] === undefined) {
                    onceResult[item.month] = item.amount;
                } else {
                    onceResult[item.month] += item.amount;
                }
            }

            if (item.regularity === "monthly") {
                // let month;
                // if (year === currentYear) {
                //     month = currentDate.getMonth();
                // } else {
                //     month = 11;
                // }
                // let currentMonth = month + 1;
                // let previousAmount;
                // if(year < currentYear && year > 2019){
                //     previousAmount = getPreviousAmount(type);
                // } else {
                //     previousAmount = 0;
                // }
                
                for (let i = item.month; i <= 12; i++) {
                    monthlyResult[i] += (item.amount + getPreviousAmount(type));
                }
            }
        });

        // sum montly and once amounts for every month
        const result = Object.entries(onceResult).reduce((acc, [key, value]) =>
            ({ ...acc, [key]: (acc[key] || 0) + value })
            , { ...monthlyResult });

        return Object.values(result)
    }

    return (
        <div className="chart">
            <h1>Expenses Chart</h1> <br />
            <div style={{ maxWidth: "800px" }}>
                <label htmlFor="year">Select a year:</label><br />
                <select id="year" value={year} onChange={(e) => { setYear(Number(e.target.value)) }}>
                    <option defaultValue value={currentYear}>{currentYear}</option>
                    <option value={currentYear - 1}>{currentYear - 1}</option>
                </select>

                <Bar
                    data={{
                        labels: ["Jan", "Feb", "Mar", "Apri", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        datasets: [
                            {
                                label: "Expenses",
                                data: getMonthlyData("expense"),
                                backgroundColor: ["aqua"],
                                borderColor: ["black"],
                                borderWidth: 2,
                            },
                            {
                                label: "Income",
                                data: getMonthlyData("income"),
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
export default SatatementsChart;