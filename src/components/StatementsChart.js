
import { Chart } from "chart.js/auto";
import { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { DataContext } from "../context/data.context";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Title from "./Title"

function SatatementsChart() {
    const { statements, updateData } = useContext(DataContext);
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

    function getPreviousAmount(type) {
        let previousData;
        if (year === (year - 1) || !formattedData) {
            return previousData = 0;
        } else {
            previousData = formattedData.filter(item => {
                return item.year === (year - 1) && item.regularity === "monthly" && item.type === type;
            });
            if (previousData.length === 1) {
                return previousData[0].amount;
            } else {
                let result = previousData?.reduce((previousValue, currentValue) => previousValue.amount + currentValue.amount, 0);
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


        <div className="Box">
            <div className="flex-row ">
                <Title>Chart</Title>
                <FormControl className="select-year">
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={year}
                        label="Year"
                        onChange={(e) => { setYear(Number(e.target.value)) }}
                    >
                        <MenuItem defaultValue value={currentYear}>{currentYear}</MenuItem>
                        <MenuItem value={currentYear - 1}>{currentYear - 1}</MenuItem>
                    </Select>
                </FormControl>
            </div>



            <Bar id="BarChart"
                data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                        {

                            label: "total Expenses",
                            data: getMonthlyData("expense"),
                            backgroundColor: ["#FC354C"],
                            borderColor: ["black"],
                            borderWidth: 1,
                            borderRadius: 6,
                            hoverBackgroundColor: "#021B79"
                        },
                        {
                            label: "total Income",
                            data: getMonthlyData("income"),
                            backgroundColor: ["#0ABFBC"],
                            borderColor: ["black"],
                            borderWidth: 1,
                            borderRadius: 6,
                            hoverBackgroundColor: "#021B79"
                        },
                    ],
                }}
            />
        </div>
    );
}
export default SatatementsChart;