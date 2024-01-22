import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
} from "react-native";
import { useForm } from "react-hook-form";
import { useFirestore } from "../../hooks/useFirestore";
import InputComponent from "../InputComponent";
import { useUserContext } from "../../UserContext";
const { addDocument, getDocument } = useFirestore();
const Qualification = () => {
  const [qualifications, setQualifications] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [tempData, setTempData] = useState({});
  const { userID } = useUserContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const collectionName = "Qualification";
    const filterField = "userId";
    const unsubscribe = getDocument(
      collectionName,
      filterField,
      userID,
      (docs) => setQualifications(docs),
      (error) => setError(error)
    );

    console.log(qualifications);
    return () => unsubscribe();
  }, []);

  const submitQualification = async (data) => {
    const { degreeName, institute, passingYear } = data;

    if (userID) {
      try {
        const qualificationObj = {
          userId: userID,
          degreeName,
          institute,
          passingYear,
        };
        await addDocument("Qualification", qualificationObj);
        console.log("Qualification added to Firestore successfully!");
      } catch (error) {
        console.error("Error during submitting:", error);
      }
    } else {
      Alert.alert("Please Login");
    }
    resetModal();
    reset();
  };

  const openQualificationModal = () => {
    setModalVisible(true);
  };

  //   const submitQualification = () => {
  //     setQualifications([...qualifications, tempData]);

  //     resetModal();
  //   };

  const resetModal = () => {
    setTempData({});
    setModalVisible(false);
  };

  const renderQualification = ({ item }) => (
    <View style={styles.item}>
      <Text>{`${item.degreeName}, ${item.institute}, ${item.passingYear}`}</Text>
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: "red" }]}
          onPress={""}
        >
          <Text style={{ color: "white" }}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={resetModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <TextInput
              placeholder="Degree Name"
              onChangeText={(text) =>
                setTempData({ ...tempData, degreeName: text })
              }
              value={tempData.degreeName || ""}
            /> */}

            <InputComponent
              control={control}
              placeholder={"Degree Name"}
              name="degreeName"
              error={errors?.degreeName}
              autoCapitalize="none"
            />

            <InputComponent
              control={control}
              placeholder={"Institute"}
              name="institute"
              error={errors?.institute}
              autoCapitalize="none"
            />
            <InputComponent
              control={control}
              placeholder={"Passing Year"}
              name="passingYear"
              error={errors?.passingYear}
              autoCapitalize="none"
            />

            <Button
              title="Submit"
              onPress={handleSubmit(submitQualification)}
            />

            <Button title="Cancel" onPress={resetModal} />
          </View>
        </View>
      </Modal>

      <View style={styles.section}>
        <View style={styles.headerSection}>
          <Text style={styles.header}>Qualification</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={openQualificationModal}
          >
            <Text>Add Qualification</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={qualifications}
          renderItem={renderQualification}
          keyExtractor={(item, index) => `qual-${index}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  section: {
    flex: 1,
    padding: 10,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "lightblue",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemActions: {
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

export default Qualification;
