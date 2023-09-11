import React from "react";
import { useSelector } from "react-redux";
import { DebtComponent } from "./DebtComponent";
import { LoanComponent } from "./LoanComponent.js";

const ExpenseComponent = ({ settleAmount }) => {
  const { expenseData } = useSelector((state) => state.expenses);

  return (
    <>
      {expenseData &&
        expenseData.map((data, index) => (
          <div key={data.id} className="expense-data-container">
            <div className="expense-data">
              <span>Date:</span> <p> {data.date}</p>
              <span>Description:</span> <p> {data.description}</p>
              <div className="lent-paid-container">
                <p>Total Expense: ${data.amount}</p>
              </div>
            </div>
          </div>
        ))}
      <DebtComponent settleAmount={settleAmount} />
      <LoanComponent />
    </>
  );
};

export default ExpenseComponent;
