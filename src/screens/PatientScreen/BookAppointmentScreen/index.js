import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFirestore } from "../../../hooks/useFirestore";

import { useUserContext } from "../../../UserContext";

export default function BookAppointmentScreen(props) {
  const { userID } = useUserContext();

  const { listenToDoctorProfiles, addDocument } = useFirestore();

  const [doctors, setDoctors] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [customMessage, setCustomMessage] = useState("");
  const [appmtDate, setAppmtDate] = useState("");
  const [appmtTime, setAppmtTime] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  useEffect(() => {
    const unsubscribe = listenToDoctorProfiles(
      (newDoctors) => {
        setDoctors(newDoctors);
        setFilteredDoctors(newDoctors);
      },
      (error) => console.error("Error listening to doctor profiles:", error)
    );

    console.log(doctors);

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const filtered = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]);

  const handleRequestAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setModalVisible(true);
  };

  const viewDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    console.log("-------------------------");
    console.log(doctor.userId);

    props.navigation.navigate("PatientDoctorDetailsScreen", {
      doctorId: doctor.userId,
    });
  };

  const submitAppointmentRequest = async () => {
    const appointmentData = {
      doctorId: selectedDoctor.userId,
      patientId: userID, // Assuming you have the patient's ID stored in userID
      customMessage: customMessage,
      appmtDate: appmtDate,
      appmtTime: appmtTime,
      status: "pending",
    };

    console.log("Submitting appointment request:", appointmentData);

    try {
      await addDocument("Appointment", appointmentData);
      console.log("Appointment request submitted successfully");
    } catch (error) {
      console.error("Error submitting appointment request:", error);
    }

    setModalVisible(false);
  };

  const renderDoctor = ({ item }) => (
    <View
      style={[
        styles.card,
        { flexDirection: "row", justifyContent: "space-between" },
      ]}
    >
      <View>
        <Text>Name: {item.name}</Text>
        <Text>Location: {item.location}</Text>
        <Text>Speciality: {item.speciality}</Text>
        <Text>Email: {item.email}</Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity onPress={() => handleRequestAppointment(item)}>
          <Text style={{ color: "blue" }}>Request Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => viewDoctorDetails(item)}>
          <Text style={{ color: "blue" }}>View Doctor Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by Specialty"
        style={styles.input}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FlatList
        data={filteredDoctors}
        renderItem={renderDoctor}
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
            {selectedDoctor && selectedDoctor.userId ? (
              <TextInput value={selectedDoctor.userId} style={styles.input} />
            ) : null}

            {userID && <TextInput value={userID} style={styles.input} />}
            <TextInput
              placeholder="Custom Message"
              onChangeText={setCustomMessage}
              value={customMessage}
              style={styles.input}
            />

            <TextInput
              placeholder="Appointment Date"
              onChangeText={setAppmtDate}
              value={appmtDate}
              style={styles.input}
            />
            <TextInput
              placeholder="Appointment Time"
              onChangeText={setAppmtTime}
              value={appmtTime}
              style={styles.input}
            />
            <Button title="Submit Request" onPress={submitAppointmentRequest} />
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
