import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../../../Firebase-config";
import { setFetchedData } from "../../../../store/slices/expenseSlice";

const usersCollectionRef = collection(db, "users");
const expensesCollectionRef = collection(db, "expenses");
const expenseMembersCollectionRef = collection(db, "expense-members");
const loanCollectionRef = collection(db, "loan");

export const fetchUserData = async (setloading, dispatch, authUser) => {
  try {
    setloading(true);

    const queryUsers = query(
      usersCollectionRef,
      where("u_id", "==", authUser.u_id)
    );
    const querySnapshotUsers = await getDocs(queryUsers);
    const userDataDb = querySnapshotUsers.docs.map((doc) => {
      return doc.data();
    });

    const expenseUserDataPromises = userDataDb.map(async (user) => {
      const queryExpenseMembers = query(
        expenseMembersCollectionRef,
        where("u_id", "==", user.u_id)
      );
      const querySnapshotExpenseMembers = await getDocs(queryExpenseMembers);
      const expenseMembersDataDb = querySnapshotExpenseMembers.docs.map((doc) =>
        doc.data()
      );
      const expensePromises = expenseMembersDataDb.map(async (expMember) => {
        const queryExpense = query(
          expensesCollectionRef,
          where("exp_id", "==", expMember.exp_id)
        );
        const querySnapshotExpense = await getDocs(queryExpense);
        const expenseDataDb = querySnapshotExpense.docs.map((doc) =>
          doc.data()
        );
        return expenseDataDb[0];
      });

      const expenseDataArray = await Promise.all(expensePromises);

      const loanPromises = expenseMembersDataDb.map(async (expMember) => {
        const queryLoan = query(
          loanCollectionRef,
          where("exp_id", "==", expMember.exp_id)
        );
        const querySnapshotLoan = await getDocs(queryLoan);
        const loanDataDb = querySnapshotLoan.docs.map((doc) => doc.data());
        return loanDataDb;
      });
      const loanDataArray = await Promise.all(loanPromises);
      return {
        userData: user,
        expenseDataArray,
        loanDataArray,
      };
    });

    const userDataArray = await Promise.all(expenseUserDataPromises);
    const expenseData = userDataArray.flatMap((data) => data.expenseDataArray);

    const loanDataLend_tb_flat = userDataArray.flatMap((data) => {
      return data.loanDataArray;
    });
    const loanDataRec_tb_flat = userDataArray.flatMap((data) => {
      return data.loanDataArray;
    });
    const loanDataLend = loanDataLend_tb_flat.flatMap((data) => {
      return data.filter((loan) => loan?.u_id_lend === authUser.u_id);
    });
    const loanDataRec = loanDataRec_tb_flat.flatMap((data) => {
      return data.filter((loan) => loan?.u_id_rec === authUser.u_id);
    });
    const lendUserPromises = loanDataLend.map(async (data) => {
      const lendUsers = query(
        usersCollectionRef,
        where("u_id", "==", data.u_id_rec)
      );
      const lendUsersSnapshot = await getDocs(lendUsers);
      const lendUsersDb = lendUsersSnapshot.docs.map((db) => {
        return db.data();
      });
      return lendUsersDb;
    });

    const lendUserArrays = await Promise.all(lendUserPromises);
    const lendUserNames = lendUserArrays.flat();
    const debtUserPromises = loanDataRec.map(async (data) => {
      const debtUsers = query(
        usersCollectionRef,
        where("u_id", "==", data.u_id_lend)
      );
      const debtUsersSnapshot = await getDocs(debtUsers);
      const debtUsersDb = debtUsersSnapshot.docs.map((db) => {
        return db.data();
      });
      return debtUsersDb;
    });
    const debtUserArrays = await Promise.all(debtUserPromises);
    const debtUserNames = debtUserArrays.flat();
    const uniqueExpenseData = expenseData.reduce((acc, curr) => {
      const found = acc.some((item) => item.exp_id === curr.exp_id);
      if (!found) {
        acc.push(curr);
      }
      return acc;
    }, []);
    const uniqueLoanDataLend = loanDataLend.reduce((acc, curr) => {
      const found = acc.some(
        (item) => item.u_id_rec === curr.u_id_rec && item.exp_id === curr.exp_id
      );
      if (!found) {
        acc.push(curr);
      }
      return acc;
    }, []);
    const uniqueLoanDataRec = loanDataRec.reduce((acc, curr) => {
      const found = acc.some(
        (item) =>
          item.u_id_lend === curr.u_id_lend && item.exp_id === curr.exp_id
      );
      if (!found) {
        acc.push(curr);
      }
      return acc;
    }, []);

    const fetchedData = {
      expenseData: uniqueExpenseData,
      loanDataLend: uniqueLoanDataLend,
      loanDataRec: uniqueLoanDataRec,
      userLentNames: lendUserNames,
      userDebtNames: debtUserNames,
    };

    dispatch(setFetchedData(fetchedData));
    setloading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
