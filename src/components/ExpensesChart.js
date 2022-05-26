
import { Chart } from "chart.js/auto";
import { useContext, useEffect, useState } from "react";
import { Bar} from "react-chartjs-2";
import { DataContext } from "../context/data.context";

function ExpensesChart() {
    const { statements } = useContext(DataContext);
    // console.log(statements)
    const currentDate = new Date();
    // console.log(currentDate)
    const currentYear = currentDate.getFullYear();
    // console.log(currentYear)
    const [year, setYear] = useState(currentYear);
    // console.log(year)
    useEffect(()=>{
        // console.log("year inside useEffect:", year);
    }, [year])

    const getMonthlyData = (type) => {

        const formattedData = [...statements]?.map((item, i) => {
            const date = new Date(item.startDate);
            // console.log(date, i)
            return {
                month: date.getMonth() + 1,
                year: date.getFullYear(),
                amount: item.amount,
                regularity: item.regularity,
                type: item.type
            }
        })
        

        const previousYears = (currentYear) => {
        const filteredMonthly = statements.filter(item => (item.regularity == "monthly" && Number(item.startDate.substring(0,3)) < Number(currentYear)))
            // return filteredMonthly
            console.log(filteredMonthly, '<--')
        }
        

        console.log(previousYears("2020"))
        
        const filteredData = formattedData?.filter(item => { 
            // console.log("year:", year);
            // console.log("item.year:", item.year);
            return item.year === year && item.type === type
        });

        let monthlyResult = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 };
        let onceResult = {};

        filteredData.forEach(item => {
            if (item.regularity === "once") {
                if (onceResult[item.month] === undefined) {
                    onceResult[item.month] = item.amount;
                } else {
                    onceResult[item.month] += item.amount;
                }
            }

            if (item.regularity === "monthly") {
                previousYears()
                let month;
                if (year === currentYear) {
                     month = currentDate.getMonth(); 
                } else {
                     month = 11;
                }
                
                let currentMonth = month + 1;
                 
                for (let i = item.month; i <= currentMonth; i++) {
                    monthlyResult[i] += item.amount;
                }
            }
        });

        // add month
        const result = Object.entries(onceResult).reduce((acc, [key, value]) =>
            ({ ...acc, [key]: (acc[key] || 0) + value })
            , { ...monthlyResult });
            
        const monthlyData = Object.values(result)
        // console.log("monthlyData: ", monthlyData)
        return monthlyData;

        
    }
    // console.log(getMonthlyData("expense"))
    // console.log("year: ",year)

    return (
        <div className="chart">
            <h1>Expenses Chart</h1> <br />
            <div style={{ maxWidth: "800px" }}>
                <label htmlFor="year">Select a year:</label><br />

                <select id="year" value={year} onChange={(e) =>{setYear(Number(e.target.value))}}>
                    <option defaultValue value={currentYear}>{currentYear}</option>
                    <option value={currentYear-1}>{currentYear-1}</option>
                    <option value={currentYear-2}>{currentYear-2}</option>
                    <option value={currentYear-3}>{currentYear-3}</option>
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
                                label: "income",
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
export default ExpensesChart;