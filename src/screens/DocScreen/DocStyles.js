import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  profileCard: {
    backgroundColor: "lightblue",
    borderWidth: 1,
    borderRadius: 15,
    margin: 5,
    padding: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },

  splitterDash: {
    flex: 1,
    backgroundColor: "lightgrey",
    margin: 5,
  },
});

export default styles;
