import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useFirestore } from "../../../hooks/useFirestore";
import { useUserContext } from "../../../UserContext";

export default function UpcomingAppointmentsScreen(props) {
  const { userID } = useUserContext();
  const { getDocument } = useFirestore();
  const [appointmentData, setAppointmentData] = useState([]);
  const [patientData, setPatientData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const collectionName = "Appointment";
    const filterField = "doctorId";
    const unsubscribe = getDocument(
      collectionName,
      filterField,
      userID,
      (docs) => {
        const filteredDocs = docs.filter((doc) => doc.status === "accepted");
        setAppointmentData(filteredDocs);
      },
      (error) => console.error(error)
    );

    return () => unsubscribe();
  }, []);

  const ViewPatientDetails = (patientId) => {
    const collectionName = "UserProfile";
    const filterField = "userId";
    const unsubscribe = getDocument(
      collectionName,
      filterField,
      patientId,
      (docs) => {
        setPatientData(docs[0]);
        setModalVisible(true);
      },
      (error) => console.error(error)
    );

    return () => unsubscribe();
  };

  const renderAppointment = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.appointmentInfo}>
        <Text>Patient ID: {item.patientId}</Text>
        <Text>Date: {item.appmtDate}</Text>
        <Text>Time: {item.appmtTime}</Text>
        <Text>Msg: {item.customMessage}</Text>
        <Text>Status: {item.status}</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={() => ViewPatientDetails(item.patientId)}>
          <Text style={{ color: "green" }}>View Patient Details</Text>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {patientData && (
              <>
                <Text>Name: {patientData.name}</Text>
                <Text>Contact: {patientData.contact}</Text>
                <Text>Email: {patientData.email}</Text>
                <Button
                  title="Close"
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </>
            )}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
