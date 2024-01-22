import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFirestore } from "../../../hooks/useFirestore";
import { useUserContext } from "../../../UserContext";

export default function MyAppointmentsScreen(props) {
  const { getDocument, deleteDocument } = useFirestore();
  const [appointmentData, setAppointmentData] = useState([]);
  const { userID } = useUserContext();

  useEffect(() => {
    const collectionName = "Appointment";
    const filterField = "patientId";
    const unsubscribe = getDocument(
      collectionName,
      filterField,
      userID,
      (docs) => setAppointmentData(docs),
      (error) => console.error(error)
    );
    return () => unsubscribe();
  }, [userID]);

  const removeAppointment = async (appointmentId) => {
    try {
      await deleteDocument("Appointment", appointmentId);
      console.log("Appointment removed from Firestore successfully!!!!");
    } catch (error) {
      console.error("Error during removing:", error);
    }
  };

  const renderAppointmentData = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>Status: {item.status}</Text>
        <Text style={styles.cardText}>Date: {item.appmtDate}</Text>
        <Text style={styles.cardText}>Time: {item.appmtTime}</Text>
        <Text style={styles.cardText}>Message: {item.customMessage}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("PatientAppointmentDetailedScreen", {
              doctorId: item.doctorId,
              appointmentData: item,
            });
          }}
        >
          <Text>View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            removeAppointment(item.id);
          }}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={appointmentData}
        renderItem={renderAppointmentData}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  cardContent: {
    flex: 1,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    padding: 10,
    alignItems: "center",
  },
  button: {
    marginBottom: 10,
    backgroundColor: "skyblue", // This adds space below each button
  },
});
