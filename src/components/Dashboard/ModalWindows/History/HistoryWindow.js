import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { deleteDoc, doc } from "firebase/firestore";
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer, toast } from "react-toastify";

import { db } from "../../../../Firebase-config";
import ExpenseComponent from "../ExpenseComponent/ExpenseComponent";
import PDFfile from "../../../GenerateReport/PDFfile";
import { fetchUserData } from "./FetchHistoryData";

import "./HistoryWindow.scss";
import "react-toastify/dist/ReactToastify.css";

export const HistoryWindow = ({ loading, setloading, sethistory }) => {
  const { expenseData } = useSelector((state) => state.expenses);

  const authUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const notifySettle = () => toast("Amount settled");

  useEffect(() => {
    fetchUserData(setloading, dispatch, authUser);
  }, [authUser]);

  const settleAmount = (loanId) => {
    const loanDocRef = doc(db, "loan", loanId);
    notifySettle();
    deleteDoc(loanDocRef)
      .then(() => {
        sethistory(false);
      })
      .catch((error) => {
        console.error("Error deleting loan document:", error);
      });
  };

  return (
    <div className="groupInterface-container">
      <div className="grp-history">
        {loading && (
          <HashLoader
            color="#FF6666"
            loading={loading}
            size={55}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
        <h2>History</h2>

        <PDFDownloadLink
          document={<PDFfile expenseData={expenseData} />}
          fileName="Expense_Report.pdf"
        >
          {({ loading }) =>
            loading ? "Loading document..." : <button>view your report</button>
          }
        </PDFDownloadLink>

        <div className="grp-history-container">
          <ExpenseComponent settleAmount={settleAmount} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
