import React from "react";
import { Page, Text, Document } from "@react-pdf/renderer";

import { styles } from "./PDFfile-styles";

const PDFfile = ({ expenseData }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Expense Report</Text>
        {expenseData &&
          expenseData.map((expense, index) => (
            <React.Fragment key={index}>
              <Text style={styles.subtitle}>Expense {index + 1} </Text>
              <Text style={styles.text}>Date: {expense.date}</Text>
              <Text style={styles.text}>
                Description: {expense.description}
              </Text>
              <Text style={styles.text}>Amount: {expense.amount}</Text>
            </React.Fragment>
          ))}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default PDFfile;
