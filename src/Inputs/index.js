import React, { useContext } from "react";
import "./index.scss";
import { InputContext } from "../Context";

function IncomeExpenseInput() {
  const {
    option,
    description,
    amount,
    handleOption,
    handleDescription,
    handleAmount,
    handleSubmit
  } = useContext(InputContext);

  return (
    <form className="income-expense-insertion" onSubmit={handleSubmit}>
      <select
        className="options"
        value={option}
        onChange={e => handleOption(e.target.value)}
      >
        <option value="+">+</option>
        <option value="-">-</option>
      </select>
      <input
        placeholder="Add Description"
        className="description"
        value={description}
        onChange={e => handleDescription(e.target.value)} 
      />
      <input
        type="number"
        placeholder="Add Amount"
        className="amount"
        value={amount}
        onChange={e => handleAmount(e.target.value)}
      />
      <input type="submit" value="add" className="submit" />
    </form>
  );
}
export default IncomeExpenseInput;
