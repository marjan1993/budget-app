import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ListContext } from "../Context"
import "./index.scss";

function IncomeList() {
  const { incomeList, handleDeleteIncome } = useContext(ListContext);
  return (
    <div>
      <h2 id="income-header">Income</h2>
      <ul className="income-list">
        {
          incomeList.map((income,i) => (//i --> index ------ we did implicitly return instead of rerun it
            <li className="list-item" key={i}>
              <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteIncome(i)} />
              <span className="list-item-content">{income.description}</span>
              <span className="list-item-content list-amount">{income.amount}</span>
            </li>//Line 15 --> OR we can use key={income.toString() for prop key error
          ))
        }
      </ul>
    </div>
  );
}

export default IncomeList;


//IncomeList component  is the grandchild of Lists component and thats the beauty of the component :)