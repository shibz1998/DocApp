import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Modal, FlatList } from "react-native";
import { useFirestore } from "../../../hooks/useFirestore";
import { useUserContext } from "../../../UserContext";

export default function MyAppointmentsScreen(props) {
  const { getDocument } = useFirestore();
  const [appointmentData, setAppointmentData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
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

  const renderAppointmentData = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>Status: {item.status}</Text>
        <Text style={styles.cardText}>Date: {item.appmtDate}</Text>
        <Text style={styles.cardText}>Time: {item.appmtTime}</Text>
        {/* <Text style={styles.cardText}>DoctorID: {item.doctorId}</Text> */}
        <Text style={styles.cardText}>Message: {item.customMessage}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="View"
          onPress={() => {
            props.navigation.navigate("PatientAppointmentDetailedScreen", {
              doctorId: item.doctorId,
              appointmentData: item,
            });
          }}
        />
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
