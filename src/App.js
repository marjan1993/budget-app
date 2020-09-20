import React, { useState, useEffect } from "react";
import IncomeExpenseInput from "./Inputs";
import { InputContext, HeaderContext, ListContext } from "./Context";
import "./App.scss";
import Header from "./Header";
import Lists from "./Lists";

function App() {
  // header hooks
  const [income, setIncome] = useState(getHeaderInitialValue("income"));
  const [expense, setExpense] = useState(getHeaderInitialValue("expense"));
  // input hooks
  const [option, setOption] = useState("+");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  //  List hooks
  const [incomeList, setIncomeList] = useState(getListInitialValue("incomeList"));
  const [expenseList, setExpenseList] = useState(getListInitialValue("expenseList"));

  function getHeaderInitialValue(value) {//it will return the number value of the income or expense after checking if it is present already in localStorage, and if it's not present return 0
    return window.localStorage.getItem(value) ? Number(window.localStorage.getItem(value)) : 0;// because the localStorage wil save the data in String, when we get the data we should cast it to Number
  }
  function getListInitialValue(value) {
    return window.localStorage.getItem(value) ? JSON.parse(window.localStorage.getItem(value)) : [];// because the localStorage wil save the data in String, when we get the data we should parse it 
  }

  function handleOption(value) {
    setOption(value)
  }
  function handleDescription(value) {
    setDescription(value)
  }
  function handleAmount(value) {
    setAmount(value)
  }
  function reset() {
    setAmount(0);
    setDescription("");
    setOption("+");
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (amount===0) return;//we shouldn't allow the amount to be 0
    if(option==='+'){
      setIncome(income + parseFloat(amount));//because the amount could be a integer or float so to prevent that we use parseFloat(amount) instead of amount
      setIncomeList([...incomeList, { description, amount }]);//...incomeList will hold all the current array in th list and also will contain the new description and the new amount
    }else{//otherwise(option==='-') --> then we use expense
      setExpense(expense + parseFloat(amount));
      setExpenseList([...expenseList, { description, amount }]);
    }
    reset();
  }

  //we want to call this function(setLocalStorage()) only when  change occurs in one or more of this items, so we use useEffect() to do that
  useEffect(setLocalStorage, [income, expense, incomeList, expenseList]);//we only want to call this function(setLocalStorage()) when a change happens in income,expense,....
  function setLocalStorage() {//we want to save income,expense,... data to local storage
    window.localStorage.setItem("income",income);
    window.localStorage.setItem("expense",expense);
    window.localStorage.setItem("incomeList",JSON.stringify(incomeList));//this is a list of array and localStorage only accepts strings, so we have to stringify it 
    window.localStorage.setItem("expenseList",JSON.stringify(expenseList));
  }
  
  //The filter() method creates a new array with all elements that pass the test implemented by the provided function.
  function handleDeleteIncome(index) {
    const incomeItemDeleted = incomeList[index];
    setIncome(income - incomeItemDeleted.amount);//decrement the income that we have --> the total income from the amount of that incomeItem
    setIncomeList(incomeList.filter((_, i) => i !== index));//keep the items that (i !== index) then delete the item that have the same index(i === index)
  }
  function handleDeleteExpense(index) {
    const expenseItemDeleted = expenseList[index];
    setExpense(expense - expenseItemDeleted.amount);//decrement the income that we have --> the total income from the amount of that incomeItem
    setExpenseList(expenseList.filter((_, i) => i !== index));//keep the item that (i !== index) then delete the item that have the same index(i === index)
  }

  const inputContextValue = {
    option,
    description,
    amount,
    handleOption,
    handleDescription,
    handleAmount,
    handleSubmit
  };

  const headerContextValue = {
    income,
    expense
  };

  const listContextValue = {
    incomeList,
    expenseList,
    handleDeleteIncome,
    handleDeleteExpense
  }

  return (
    <div className="App">
    <HeaderContext.Provider value={headerContextValue}>
      <Header />
    </HeaderContext.Provider>
      
    <InputContext.Provider value={inputContextValue}>
      <IncomeExpenseInput />
    </InputContext.Provider>
    
    <ListContext.Provider value={listContextValue}>
      <Lists />
    </ListContext.Provider>

    </div>
  );
}

export default App;
