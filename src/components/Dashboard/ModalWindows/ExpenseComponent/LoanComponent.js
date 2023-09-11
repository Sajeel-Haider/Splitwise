import { useSelector } from "react-redux";

export const LoanComponent = () => {
  const { loanDataLend, userLentNames } = useSelector(
    (state) => state.expenses
  );

  return (
    <>
      {loanDataLend &&
        loanDataLend.map((data, index) => (
          <div key={data.id} className="expense-data-container">
            <div className="expense-data">
              <div className="lent-paid-container">
                {index < loanDataLend.length && (
                  <div className="lent-info">
                    <p>
                      You Lent ${loanDataLend[index].amount} to{" "}
                      {userLentNames[index].name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
