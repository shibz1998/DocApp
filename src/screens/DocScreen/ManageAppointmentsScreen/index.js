// import { StyleSheet, Text, View, Button } from "react-native";

// import React, { useState, useEffect } from "react";
// import { useFirestore } from "../../../hooks/useFirestore";
// import { useUserContext } from "../../../UserContext";
// export default function ManageAppointmentsScreen(props) {
//   console.log("Manage Appointment Running");
//   const { userID } = useUserContext();
//   const { getDocument } = useFirestore();
//   const [appointmentData, setAppointmentData] = useState(null);

//   useEffect(() => {
//     const collectionName = "Appointment";
//     const filterField = "doctorId";
//     const unsubscribe = getDocument(
//       collectionName,
//       filterField,
//       userID,
//       (docs) => setAppointmentData(docs),
//       (error) => setError(error)
//     );

//     console.log(appointmentData);
//     return () => unsubscribe();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>Manage Appointsment</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

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
      (docs) => setAppointmentData(docs),
      (error) => console.error(error)
    );
    console.log(appointmentData);
    return () => unsubscribe();
  }, [userID]);

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
        <Text>Patient ID: {item.patientId}</Text>
        <Text>Date: {item.appmtDate}</Text>
        <Text>Time: {item.appmtTime}</Text>
        <Text>Msg: {item.customMessage}</Text>
        <Text>Status ID: {item.status}</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={() => handleAccept(item.id)}>
          <Text style={{ color: "green" }}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleReject(item.id)}>
          <Text style={{ color: "red" }}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={appointmentData}
        renderItem={renderAppointment}
        keyExtractor={(item) => item.id}
      />
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
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    width: "93%",
  },
  appointmentInfo: {},
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
});