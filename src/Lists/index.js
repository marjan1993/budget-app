import React from "react";
import IncomeList from "./IncomeList";
import ExpenseList from "./ExpenseList";
import "./index.scss";

function Lists() {
  return (
    <div className="income-expense-lists">
      <IncomeList />
      <ExpenseList />
    </div>
  );
}

export default Lists;
