import { useContext, useEffect } from "react";
import { DataContext } from "../context/data.context";

export default function GetMonthlyData (){
    const {statements} = useContext(DataContext);

    function formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            year = d.getFullYear();
        if (month.length < 2) 
            month = '0' + month;
        return {}`${year}${month}`
    }

    const data = [...statements].map(item => {
        return item.startDate = formatDate(item.startDate)
        })

        function getDiffDate() {
            let startDate = Math.min(...data);
            let endDate = Math.max(...data);

            const allMonths = [];
            for (let i = startDate; i < endDate; i++) {
                allMonths.push(i);
            }
            return allMonths;
          }

          console.log(getDiffDate());



    

// if (month.lenght <10 ){month = `${0}${month}`}

        
}
