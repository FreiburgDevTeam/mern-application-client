import { useContext } from "react";
import { DataContext } from "../context/data.context";

function Balance() {
    const { statements } = useContext(DataContext);


    const renderBalance = () => {

        if (!statements) {
            return 0
        } else {

            // difference in Months between startDate and currentDate
            function monthDiff(startDate) {
                let currentDate = new Date();
                return (currentDate.getMonth() + 1) - startDate.getMonth() +
                    (12 * (currentDate.getFullYear() - startDate.getFullYear()))
            }

            // INCOMES
            // once incomes
            const incomesOnce = [...statements]?.filter(statement => statement.type === "income" && statement.regularity === "once");
            const incomesAmountOnce = incomesOnce.map(statement => statement.amount)
            let totalIncomeAmountOnce = 0;
            if (incomesAmountOnce.length > 0) {
                totalIncomeAmountOnce = incomesAmountOnce.reduce((prev, next) => prev + next);
            }

            // monthly incomes
            const incomesMonthly = [...statements]?.filter(statement => statement.type === "income" && statement.regularity === "monthly");
            const incomesAmountMonthly = incomesMonthly.map(statement => {
                const startDate = new Date(statement.startDate);
                return monthDiff(startDate) * statement.amount;
            })
            let totalIncomeAmountMonthly = 0;
            if (incomesAmountMonthly.length > 0) {
                totalIncomeAmountMonthly = incomesAmountMonthly.reduce((prev, next) => prev + next);
            }

            // sum all incomes
            const totalIncomes = totalIncomeAmountOnce + totalIncomeAmountMonthly;

            // EXPENSES
            // once expenses
            const expensesOnce = [...statements]?.filter(statement => statement.type === "expense" && statement.regularity === "once");
            const expensesAmountOnce = expensesOnce.map(statement => statement.amount)
            let totalExpenseAmountOnce = 0;
            if (expensesAmountOnce.length > 0) {
                totalExpenseAmountOnce = expensesAmountOnce.reduce((prev, next) => prev + next);
            }

            // monthly expenses
            const expensesMonthly = [...statements]?.filter(statement => statement.type === "expense" && statement.regularity === "monthly");
            const expensesAmountMonthly = expensesMonthly.map(statement => {
                const startDate = new Date(statement.startDate);
                return monthDiff(startDate) * statement.amount;
            })
            let totalExpenseAmountMonthly = 0;
            if (expensesAmountMonthly.length > 0) {
                totalExpenseAmountMonthly = expensesAmountMonthly.reduce((prev, next) => prev + next);
            }

            // sum all expenses
            const totalExpenses = totalExpenseAmountOnce + totalExpenseAmountMonthly;

            // BALANCE
            const total = totalIncomes - totalExpenses;
            return total;
        }
    }

    const balance = renderBalance();

    return (
        <>
            <p>Balance:</p>
            <h1>{balance}</h1>
        </>
    )
}

export default Balance;
