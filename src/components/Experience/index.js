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
const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const { userID } = useUserContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const collectionName = "Experience";
    const filterField = "userId";
    const unsubscribe = getDocument(
      collectionName,
      filterField,
      userID,
      (docs) => setExperiences(docs),
      (error) => setError(error)
    );

    console.log(experiences);
    return () => unsubscribe();
  }, []);

  const submitExperience = async (data) => {
    resetModal();
    const { clinic, startYear, endYear, description } = data;

    if (userID) {
      try {
        const experienceObj = {
          userId: userID,
          clinic,
          startYear,
          endYear,
          description,
        };
        await addDocument("Experience", experienceObj);
        console.log("Experience added to Firestore successfully!");
      } catch (error) {
        console.error("Error during submitting:", error);
      }
    } else {
      Alert.alert("Something went Wrong");
    }
  };

  const removeExperience = async (experienceId) => {
    try {
      await deleteDocument("Experience", experienceId);
      console.log("Experience removed from Firestore successfully!!!!");
    } catch (error) {
      console.error("Error during removing:", error);
    }
  };

  const openExperienceModal = () => {
    setModalVisible(true);
  };

  const resetModal = () => {
    reset();
    setModalVisible(false);
  };

  const renderExperience = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.contentText}>Clinic: {item.Clinic}</Text>
        <Text style={styles.contentText}>Start Year: {item.startYear}</Text>
        <Text style={styles.contentText}>End Year: {item.endYear}</Text>
        <Text style={styles.contentText}>Description: {item.description}</Text>
      </View>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: "red" }]}
        onPress={() => removeExperience(item.id)}
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
              placeholder={"Clinic"}
              name="clinic"
              error={errors?.Clinic}
              autoCapitalize="none"
            />
            <InputComponent
              control={control}
              placeholder={"Start Year"}
              name="startYear"
              error={errors?.startYear}
              autoCapitalize="none"
            />
            <InputComponent
              control={control}
              placeholder={"End Year"}
              name="endYear"
              error={errors?.endYear}
              autoCapitalize="none"
            />
            <InputComponent
              control={control}
              placeholder={"Description"}
              name="description"
              error={errors?.description}
              autoCapitalize="none"
            />

            <Button title="Submit" onPress={handleSubmit(submitExperience)} />
            <Button title="Cancel" onPress={resetModal} />
          </View>
        </View>
      </Modal>

      <View style={styles.headerSection}>
        <Text style={styles.header}>Experience</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={openExperienceModal}
        >
          <Text>Add Experience</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={experiences}
        renderItem={renderExperience}
        keyExtractor={(item, index) => `qual-${index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
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

export default Experience;
