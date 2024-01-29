import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
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

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

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
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("search rendering");
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

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
  };

  const viewDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    props.navigation.navigate("PatientDoctorDetailsScreen", {
      doctorId: doctor.userId,
    });
  };

  const submitAppointmentRequest = async (data) => {
    const { customMessage } = data;
    const formattedDate = format(date, "EEEE dd/MM/yyyy");
    const formattedTime = format(time, "HH:mm");

    const currentDate = new Date();
    const selectedDateTime = new Date(
      date.setHours(time.getHours(), time.getMinutes(), 0, 0)
    );

    if (selectedDateTime >= currentDate) {
      const appointmentData = {
        doctorId: selectedDoctor.userId,
        patientId: userID,
        doctorName: selectedDoctor.name,
        customMessage: customMessage,
        appmtDate: formattedDate,
        appmtTime: formattedTime,
        status: "pending",
      };
      console.log("Submitting appointment request:", appointmentData);

      try {
        await addDocument("Appointment", appointmentData);
        console.log("Appointment request submitted successfully");
        Alert.alert("Successfully Submitted");
      } catch (error) {
        console.error("Error submitting appointment request:", error);
        Alert.alert("Error", "Failed to submit appointment request");
      }
    } else {
      Alert.alert("Error", "Appointment date and time must be in the future");
    }

    setModalVisible(false);
    reset();
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

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleRequestAppointment(item)}
        >
          <Text style={{ color: "blue" }}>Request Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ margin: 5 }}
          onPress={() => viewDoctorDetails(item)}
        >
          <Text style={{ color: "blue" }}>View Doctor Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by name, location or speciality"
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <View style={{ flex: 1 }}>
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
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}
            >
              Request Appointment Form
            </Text>

            <InputComponent
              control={control}
              placeholder="Custom Message"
              name="customMessage"
              error={errors?.customMessage}
              autoCapitalize="none"
              style={{ borderWidth: 1 }}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={[styles.formButton, { backgroundColor: "lightgrey" }]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>Select Date</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onDateChange}
                />
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={[styles.formButton, { backgroundColor: "lightgrey" }]}
                onPress={() => setShowTimePicker(true)}
              >
                <Text>Select Time</Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onTimeChange}
                />
              )}
            </View>

            <TouchableOpacity
              onPress={handleSubmit(submitAppointmentRequest)}
              style={styles.formButton}
            >
              <Text style={{ color: "white" }}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false), reset();
              }}
              style={[styles.formButton, { backgroundColor: "red" }]}
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
    backgroundColor: "#55c2da",
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
    backgroundColor: "white",
    width: "88%",
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: 250,
    backgroundColor: "white",
  },

  button: {
    backgroundColor: "white",
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
  },

  formButton: {
    backgroundColor: "green",
    padding: 7,
    margin: 7,
    borderRadius: 5,
  },
});
