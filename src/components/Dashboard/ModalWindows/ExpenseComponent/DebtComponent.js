import { useSelector } from "react-redux";

export const DebtComponent = ({ settleAmount }) => {
  const { loanDataRec, userDebtNames } = useSelector((state) => state.expenses);

  return (
    <>
      {loanDataRec &&
        loanDataRec.map((data, index) => (
          <div key={data.id} className="expense-data-container">
            <div className="expense-data">
              <div className="lent-paid-container">
                {index < loanDataRec.length && (
                  <div className="debt-info">
                    <p>
                      Debt ${loanDataRec[index].amount} to Pay to {""}
                      {userDebtNames[index].name}
                    </p>
                    <button
                      className="settle-btn"
                      onClick={() => settleAmount(loanDataRec[index].loan_id)}
                    >
                      Settle
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
