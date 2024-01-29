import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFirestore } from "../../../hooks/useFirestore";
import { useUserContext } from "../../../UserContext";

export default function ManageAppointmentsScreen(props) {
  const { userID } = useUserContext();
  const { getDocument, updateAppointmentStatus } = useFirestore();
  const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    const collectionName = "Appointment";
    const filterField = "doctorId";
    const unsubscribe = getDocument(
      collectionName,
      filterField,
      userID,
      (docs) => {
        const filteredDocs = docs.filter((doc) => doc.status === "pending");
        setAppointmentData(filteredDocs);
      },
      (error) => console.error(error)
    );

    return () => unsubscribe();
  }, []);

  const handleAccept = (appointmentId) => {
    updateAppointmentStatus(appointmentId, "accepted");
  };

  const handleReject = (appointmentId) => {
    updateAppointmentStatus(appointmentId, "rejected");
  };

  const renderAppointment = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.appointmentInfo}>
        <Text>Patient ID: {item.patientId.substring(0, 10)}</Text>
        <Text>Date: {item.appmtDate}</Text>
        <Text>Time: {item.appmtTime}</Text>
        <Text>Msg: {item.customMessage}</Text>
        <Text>Status: {item.status}</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "green",
            padding: 8,
            marginVertical: 5,
            borderRadius: 5,
          }}
          onPress={() => handleAccept(item.id)}
        >
          <Text style={{ color: "white" }}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "red",
            padding: 8,
            marginVertical: 5,
            borderRadius: 5,
          }}
          onPress={() => handleReject(item.id)}
        >
          <Text style={{ color: "white" }}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ margin: 10 }}>
        <FlatList
          data={appointmentData}
          renderItem={renderAppointment}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#8fcde2",
    backgroundColor: "#55c2da",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    width: "100%",
  },
  appointmentInfo: {},
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
});
