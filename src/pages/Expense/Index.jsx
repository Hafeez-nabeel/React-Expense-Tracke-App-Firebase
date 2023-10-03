import React, { useEffect, useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./style.css";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate, Navigate } from "react-router-dom";
import Auth from "../Authentication/Index";
// import { useAuthRedirect } from "../../hooks/useAuthRedirect";

const ExpenseTracker = () => {
  // useAuthRedirect();
  const navigate = useNavigate();
  const userTrue = localStorage.getItem("auth");
  if (userTrue === null) {
    // navigate("/");
    // console.log(navigate);
    return <Auth />;
  }
  // console.log(userTrue);
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionsTotal } = useGetTransactions();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const { name, profilePhoto } = useGetUserInfo();
  const { balance, income, expenses } = transactionsTotal;
  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
  };
  const signOutUser = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   if (!userTrue) {
  //     navigate("/");
  //   }
  // }, [name, profilePhoto, navigate]);

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1 className="head">{name}'s Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            {balance >= 0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>${income}</p>
            </div>
            <div className="expenses">
              <h4>expenses</h4>
              <p>${expenses}</p>
            </div>
          </div>
          <form action="" className="add-transaction" onSubmit={onSubmit}>
            <input type="text" placeholder="Description" required onChange={(e) => setDescription(e.target.value)} />
            <input type="number" placeholder="Amount" required onChange={(e) => setTransactionAmount(e.target.value)} />
            <input type="radio" id="expense" checked={transactionType === "expense"} value="expense" onChange={(e) => setTransactionType(e.target.value)} />
            <label htmlFor="expense">Expense</label>
            <input type="radio" id="income" checked={transactionType === "income"} value="income" onChange={(e) => setTransactionType(e.target.value)} />
            <label htmlFor="income">Income</label>
            <button type="submit">Add Transaction</button>
          </form>
        </div>
        {profilePhoto && (
          <div className="profile">
            <img className="profile-photo" src={profilePhoto}></img>
            <button className="sign-out-button" onClick={signOutUser}>
              Sign Out
            </button>
          </div>
        )}
      </div>
      <div className="transactions">
        <h3> Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType, id } = transaction;
            return (
              <li key={id}>
                <h4>{description}</h4>
                <p>
                  ${transactionAmount} . <label style={{ color: transactionType === "expense" ? "red" : "green" }}>{transactionType}</label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ExpenseTracker;
