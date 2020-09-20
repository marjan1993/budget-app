import React, { useContext } from "react";
import { HeaderContext } from "../Context";
import "./index.scss";

function Header() {
  const { income, expense } = useContext(HeaderContext);
  return (
    <div className="app-header">
      <h3 className="current-budget-header">Current Budget</h3>
      <p className="budget-number">{income - expense}</p>
      <p className="income">{income}</p>
      <br />
      <p className="expense">{expense}</p>
    </div>
  );
}
export default Header;
