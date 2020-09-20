import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ListContext } from "../Context";
import "./index.scss";

function ExpenseList() {
  const { expenseList, handleDeleteExpense } = useContext(ListContext);
  return (
    <div>
      <h2 id="expense-header">Expense</h2>
      <ul className="expense-list">
        {
          expenseList.map((expense,i) => (//i --> index ------ we did implicitly return instead of rerun it
            <li className="list-item" key={i}>
              <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteExpense(i)} />
              <span className="list-item-content">{expense.description}</span>
              <span className="list-item-content list-amount">{expense.amount}</span>
            </li>//Lin 15 --> OR we can use key={expense.toString() for prop key error
          ))
        }
      </ul>
    </div>
  );
}

export default ExpenseList;

//ExpenseList component  is the grandchild of Lists component and thats the beauty of the component :)
