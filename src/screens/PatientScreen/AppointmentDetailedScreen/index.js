import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useFirestore } from "../../../hooks/useFirestore";

const AppointmentDetailedScreen = ({ route }) => {
  const { doctorId, appointmentData } = route.params;
  const { getDocument } = useFirestore();

  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const collectionName = "UserProfile";
    const filterField = "userId";

    const unsubscribe = getDocument(
      collectionName,
      filterField,
      doctorId,
      (docs) => setDoctorData(docs),
      (error) => console.error(error)
    );

    return () => unsubscribe();
  }, [doctorId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Doctor Details:</Text>
        {doctorData.map((doc, index) => (
          <View key={index} style={styles.detailView}>
            <Text style={styles.detailTitle}>Name:</Text>
            <Text style={styles.detailText}>{doc.name}</Text>

            <Text style={styles.detailTitle}>Speciality:</Text>
            <Text style={styles.detailText}>{doc.speciality}</Text>

            <Text style={styles.detailTitle}>Email:</Text>
            <Text style={styles.detailText}>{doc.email}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Appointment Details:</Text>
        <View style={styles.detailView}>
          <Text style={styles.detailTitle}>Status:</Text>
          <Text style={styles.detailText}>{appointmentData.status}</Text>

          <Text style={styles.detailTitle}>Date:</Text>
          <Text style={styles.detailText}>{appointmentData.appmtDate}</Text>

          <Text style={styles.detailTitle}>Time:</Text>
          <Text style={styles.detailText}>{appointmentData.appmtTime}</Text>

          <Text style={styles.detailTitle}>Message:</Text>
          <Text style={styles.detailText}>{appointmentData.customMessage}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailView: {
    marginBottom: 10,
  },
  detailTitle: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 16,
  },
  detailText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
});

export default AppointmentDetailedScreen;
