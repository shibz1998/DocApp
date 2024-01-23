import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f697b",
  },

  title: {
    fontWeight: "bold",
    fontSize: 30,
    // color: "#d04531",
    color: "#94c11e",

    marginVertical: 10,
  },

  button: {
    backgroundColor: "#212121",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    marginTop: 15,
  },
  input: {
    borderRadius: 5,
    padding: 5,
    margin: 5,
    backgroundColor: "white",
    // opacity: 0.9,
    // zIndex: 0,

    width: 250,
  },
  buttonTextColor: {
    color: "white",
  },
  card: {
    backgroundColor: "#e4ede7",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },

  text: {
    color: "black",
    marginTop: 10,
  },
  linkText: {
    color: "#d04531", // Orange color
    textDecorationLine: "underline",
  },

  selectedButton: {
    backgroundColor: "lightblue",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    marginTop: 15,
  },

  unSelectedButton: {
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    marginTop: 15,
  },
});

export default styles;
