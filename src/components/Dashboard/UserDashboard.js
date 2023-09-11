import { useState } from "react";
import { useCallback } from "react";

import { HistoryWindow } from "./ModalWindows/History/HistoryWindow";
import { ModalAddExpenseWindow } from "./ModalWindows/AddExpense/ModalAddExpenseWindow";
import instructData from "../../staticData/instructions.json";

import { SharedButtons } from "./SharedButtons/SharedButtons";
import "./UserDashboard.scss";

export const UserDashboard = () => {
  const [loading, setloading] = useState(true);
  const [history, sethistory] = useState(false);
  const [instruct, setInstruct] = useState(true);
  const [modalExpenseWindow, setmodalExpenseWindow] = useState(false);

  const handleClick = useCallback((type) => {
    switch (type) {
      case "EXPENSE-WINDOW":
        setmodalExpenseWindow(true);
        setInstruct(false);
        sethistory(false);
        break;
      case "INSTRUCTIONS-WINDOW":
        setmodalExpenseWindow(false);
        setInstruct(true);
        sethistory(false);
        break;
      case "HISTORY-WINDOW":
        setmodalExpenseWindow(false);
        setInstruct(false);
        sethistory(true);
        break;
      default:
    }
  }, []);

  return (
    <div className="user-dashboard-container">
      <div className="all-btn">
        <SharedButtons
          active={modalExpenseWindow}
          text="Add an expense"
          onClick={() => handleClick("EXPENSE-WINDOW")}
        />
        <SharedButtons
          active={history}
          text="Open History"
          onClick={() => handleClick("HISTORY-WINDOW")}
        />
        <SharedButtons
          active={instruct}
          text="Open Instructions"
          onClick={() => handleClick("INSTRUCTIONS-WINDOW")}
        />
      </div>
      {history && (
        <>
          <HistoryWindow
            key={history}
            loading={loading}
            setloading={setloading}
            sethistory={sethistory}
          />
        </>
      )}
      {instruct && (
        <div>
          <h1>{instructData.title}</h1>
          <h3>{instructData.subtitle1}</h3>
          <h3>{instructData.subtitle2}</h3>
          <h3>{instructData.subtitle3}</h3>
        </div>
      )}
      {modalExpenseWindow && (
        <ModalAddExpenseWindow setmodalExpenseWindow={setmodalExpenseWindow} />
      )}
    </div>
  );
};
