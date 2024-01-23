import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFirestore } from "../../../hooks/useFirestore";
import InputComponent from "../../../components/InputComponent";
import { useUserContext } from "../../../UserContext";
import { useForm } from "react-hook-form";

export default function BookAppointmentScreen(props) {
  const { userID } = useUserContext();

  const { listenToDoctorProfiles, addDocument } = useFirestore();

  const [doctors, setDoctors] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const unsubscribe = listenToDoctorProfiles(
      (newDoctors) => {
        setDoctors(newDoctors);
        setFilteredDoctors(newDoctors);
      },
      (error) => console.error("Error listening to doctor profiles:", error)
    );
    console.log(doctors);
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

  const submitAppointmentRequest = async (data) => {
    const { appmtDate, appmtTime, customMessage } = data;

    const appointmentData = {
      doctorId: selectedDoctor.userId,
      patientId: userID,
      doctorName: selectedDoctor.name,
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
    Alert.alert("Successfully Submitted");
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
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Search for doctors"
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        <FlatList
          data={filteredDoctors}
          renderItem={renderDoctor}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

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
            {/* {selectedDoctor && selectedDoctor.name ? (
              <TextInput value={selectedDoctor.name} style={styles.input} />
            ) : null} */}
            {/* <TextInput
              placeholder="Appointment Date DD/MM/YYYY"
              onChangeText={setAppmtDate}
              value={appmtDate}
              style={styles.input}
            />
            <TextInput
              placeholder="Appointment Time: HH:MM"
              onChangeText={setAppmtTime}
              value={appmtTime}
              style={styles.input}
            />

            <TextInput
              placeholder="Custom Message"
              onChangeText={setCustomMessage}
              value={customMessage}
              style={styles.input}
            /> */}

            <InputComponent
              control={control}
              placeholder="Appointment Date DD/MM/YYYY"
              name="appmtDate"
              error={errors?.appmtDate}
              autoCapitalize="none"
            />

            <InputComponent
              control={control}
              placeholder="Appointment Time: HH:MM"
              name="appmtTime"
              error={errors?.appmtTime}
              autoCapitalize="none"
            />
            <InputComponent
              control={control}
              placeholder="Custom Message"
              name="customMessage"
              error={errors?.customMessage}
              autoCapitalize="none"
            />

            <TouchableOpacity
              onPress={handleSubmit(submitAppointmentRequest)}
              style={{
                backgroundColor: "green",
                padding: 7,
                margin: 7,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white" }}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false), reset();
              }}
              style={{
                backgroundColor: "red",
                padding: 7,
                margin: 7,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white" }}>Cancel</Text>
            </TouchableOpacity>
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
    backgroundColor: "ivory",
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
  searchInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: 250,
    backgroundColor: "white",
  },
});
