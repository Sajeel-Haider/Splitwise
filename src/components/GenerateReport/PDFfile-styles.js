import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  body: {
    padding: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Helvetica-Bold",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    fontFamily: "Helvetica-Bold",
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "Helvetica",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
  },
});
