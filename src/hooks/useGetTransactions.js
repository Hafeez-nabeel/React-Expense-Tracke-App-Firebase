import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsTotal, setTransactionsTotal] = useState({
    balance: 0.0,
    expenses: 0.0,
    income: 0.0,
  });

  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();
  const getTransactions = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(transactionCollectionRef, where("userID", "==", userID), orderBy("createdAt"));

      onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalExpense = 0;
        let totalincome = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });
          if (data.transactionType === "expense") {
            totalExpense += Number(data.transactionAmount);
          } else {
            totalincome += Number(data.transactionAmount);
          }
        });

        let totalBalance = totalincome - totalExpense;
        setTransactions(docs);
        setTransactionsTotal({
          balance: totalBalance,
          expenses: totalExpense,
          income: totalincome,
        });
      });
    } catch (error) {
      console.error(error);
    }
    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);
  return { transactions, transactionsTotal };
};
