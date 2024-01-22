// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   Modal,
//   TextInput,
//   Button,
// } from "react-native";

// const MyProfileScreen = () => {
//   const [qualifications, setQualifications] = useState([]);
//   const [experiences, setExperiences] = useState([]);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [tempData, setTempData] = useState({});
//   const [modalType, setModalType] = useState(""); // "qualification" or "experience"

//   // Functions to handle modal for qualifications
//   const openQualificationModal = () => {
//     setModalType("qualification");
//     setModalVisible(true);
//   };

//   const submitQualification = () => {
//     setQualifications([...qualifications, tempData]);
//     resetModal();
//   };

//   // Functions to handle modal for experiences
//   const openExperienceModal = () => {
//     setModalType("experience");
//     setModalVisible(true);
//   };

//   const submitExperience = () => {
//     setExperiences([...experiences, tempData]);
//     resetModal();
//   };

//   // Reset modal data
//   const resetModal = () => {
//     setTempData({});
//     setModalVisible(false);
//   };

//   // Render functions for qualifications and experiences
//   const renderQualification = ({ item }) => (
//     <View style={styles.item}>
//       <Text>{`${item.degreeName}, ${item.institute}, ${item.passingYear}`}</Text>
//       <View style={styles.itemActions}>
//         {/* Implement editQualification and removeQualification as needed */}
//       </View>
//     </View>
//   );

//   const renderExperience = ({ item }) => (
//     <View style={styles.item}>
//       <Text>{`${item.clinic}, ${item.startYear}-${item.endYear}, ${item.description}`}</Text>
//       <View style={styles.itemActions}>
//         {/* Implement editExperience and removeExperience as needed */}
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={isModalVisible}
//         onRequestClose={resetModal}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             {modalType === "qualification" && (
//               <>
//                 <TextInput
//                   placeholder="Degree Name"
//                   onChangeText={(text) =>
//                     setTempData({ ...tempData, degreeName: text })
//                   }
//                   value={tempData.degreeName || ""}
//                 />
//                 {/* Add more TextInputs for institute, passingYear */}
//                 <Button title="Submit" onPress={submitQualification} />
//               </>
//             )}
//             {modalType === "experience" && (
//               <>
//                 <TextInput
//                   placeholder="Clinic Name"
//                   onChangeText={(text) =>
//                     setTempData({ ...tempData, clinic: text })
//                   }
//                   value={tempData.clinic || ""}
//                 />
//                 {/* Add more TextInputs for startYear, endYear, description */}
//                 <Button title="Submit" onPress={submitExperience} />
//               </>
//             )}
//             <Button title="Cancel" onPress={resetModal} />
//           </View>
//         </View>
//       </Modal>

//       <View style={styles.section}>
//         <View style={styles.headerSection}>
//           <Text style={styles.header}>Qualification</Text>
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={openQualificationModal}
//           >
//             <Text>Add Qualification</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={qualifications}
//           renderItem={renderQualification}
//           keyExtractor={(item, index) => `qual-${index}`}
//         />
//       </View>

//       <View style={styles.section}>
//         <View style={styles.headerSection}>
//           <Text style={styles.header}>Experience</Text>
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={openExperienceModal}
//           >
//             <Text>Add Experience</Text>
//           </TouchableOpacity>
//         </View>

//         <FlatList
//           data={experiences}
//           renderItem={renderExperience}
//           keyExtractor={(item, index) => `exp-${index}`}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "column",
//     flex: 1,
//   },
//   section: {
//     flex: 1,
//     padding: 10,
//   },
//   headerSection: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   addButton: {
//     backgroundColor: "lightblue",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 5,
//   },
//   item: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   itemActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: 100,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
// });

// export default MyProfileScreen;
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Qualification from "../../../components/Qualification";

const MyProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Qualification />
    </View>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
});
