// import { StyleSheet, Text, View, Button } from "react-native";

// import React, { useState, useEffect } from "react";
// import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
// import { useFirestore } from "../../../hooks/useFirestore";

// export default function AppointmentScreen(props) {
//   console.log("Appointment Page Running");
//   const { currentUser, signOutUser } = useFirebaseAuth();
//   const { listenToDocument } = useFirestore();
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     if (currentUser) {
//       console.log(currentUser.uid);
//       const collectionName = "UserProfile";
//       const unsubscribe = listenToDocument(
//         collectionName,
//         currentUser.uid,
//         (docs) => setUserData(docs[0]),
//         (error) => setError(error)
//       );

//       return () => unsubscribe();
//     } else {
//       console.log("error");
//     }
//   }, [currentUser]);

//   const handleLogout = async () => {
//     try {
//       await signOutUser();

//       console.log("User signed out successfully -----");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   console.log(userData);

//   return (
//     <View style={styles.container}>
//       <Text>Patient - Dashboard Screen</Text>
//       {userData && (
//         <View>
//           <Text>Name: {userData.name}</Text>
//           <Text>contact: {userData.contact}</Text>
//           <Text>User Type: {userData.userType}</Text>
//           <Text>Name: {userData.email}</Text>
//         </View>
//       )}
//       <Button title="LOG OUT" onPress={handleLogout} />
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
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { useFirebaseAuth } from "../../../hooks/useFirebaseAuth";
import { useFirestore } from "../../../hooks/useFirestore";

export default function AppointmentScreen(props) {
  const { currentUser, signOutUser } = useFirebaseAuth();
  const { listenToDoctorProfiles } = useFirestore();
  const [doctors, setDoctors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [customMessage, setCustomMessage] = useState("");
  const [appmtDate, setAppmtDate] = useState("");
  const [appmtTime, setAppmtTime] = useState("");

  useEffect(() => {
    const unsubscribe = listenToDoctorProfiles(
      (newDoctors) => setDoctors(newDoctors),
      (error) => console.error("Error listening to doctor profiles:", error)
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleRequestAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setModalVisible(true);
  };

  const submitAppointmentRequest = async () => {
    console.log("Submitting appointment request for:", selectedDoctor.name);
    // Implement the logic to save the appointment request to Firebase
    setModalVisible(false);
  };

  const renderDoctor = ({ item }) => (
    <View style={styles.card}>
      <Text>Name: {item.name}</Text>
      <Button
        title="Request Appointment"
        onPress={() => handleRequestAppointment(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Patient - Dashboard Screen</Text>
      <FlatList
        data={doctors}
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
        <View style={styles.modalView}>
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
        </View>
      </Modal>

      <Button title="LOG OUT" onPress={signOutUser} />
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
