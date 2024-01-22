import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
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
      (error) => setError(error)
    );

    return () => unsubscribe();
  }, [userID]);

  console.log(appointmentData);
  const renderAppointmentData = ({ item }) => (
    <View style={[styles.card, { flexDirection: "row" }]}>
      <View>
        <Text>Status: {item.status}</Text>
        <Text>DoctorID: {item.doctorId}</Text>
        {/* <Text>Speciality: {item.speciality}</Text> */}
      </View>
      <View style={{ justifyContent: "center" }}>
        <Button
          title="View"
          onPress={() => {
            setModalVisible(true);
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
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
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
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
});
