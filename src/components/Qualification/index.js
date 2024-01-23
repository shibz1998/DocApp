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
const { addDocument, getDocument, deleteDocument } = useFirestore();
const Qualification = () => {
  const [qualifications, setQualifications] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
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
    resetModal();
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
      Alert.alert("Something went Wrong");
    }
  };

  const removeQualification = async (qualificationId) => {
    try {
      await deleteDocument("Qualification", qualificationId);
      console.log("Qualification removed from Firestore successfully!!!!");
    } catch (error) {
      console.error("Error during removing:", error);
    }
  };

  const openQualificationModal = () => {
    setModalVisible(true);
  };

  const resetModal = () => {
    reset();
    setModalVisible(false);
  };

  const renderQualification = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.contentText}>Degree: {item.degreeName}</Text>
        <Text style={styles.contentText}>Institute: {item.institute}</Text>
        <Text style={styles.contentText}>Year: {item.passingYear}</Text>
      </View>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: "red" }]}
        onPress={() => removeQualification(item.id)}
      >
        <Text style={{ color: "white" }}>Remove</Text>
      </TouchableOpacity>
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

      <View style={styles.headerSection}>
        <Text style={styles.header}>Qualification</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={openQualificationModal}
        >
          <Text> + Add Qualification</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ marginVertical: 5 }}
        data={qualifications}
        showsVerticalScrollIndicator={false}
        renderItem={renderQualification}
        keyExtractor={(item, index) => `qual-${index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#8fcde2",
    margin: 5,
    padding: 10,
    borderRadius: 5,
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
    backgroundColor: "lightgreen",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
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
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  cardContent: {
    flex: 1,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 2,
  },
});

export default Qualification;
