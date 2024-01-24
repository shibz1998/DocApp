import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useFirestore } from "../../../hooks/useFirestore";

const DoctorDetailsScreen = ({ route }) => {
  const { doctorId } = route.params;
  const { getDocument } = useFirestore();

  const [qualifications, setQualifications] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const hasQualifications = qualifications.length > 0;
  const hasExperiences = experiences.length > 0;

  useEffect(() => {
    const collectionName = "Qualification";
    const filterField = "userId";

    const unsubscribe = getDocument(
      collectionName,
      filterField,
      doctorId,
      (docs) => setQualifications(docs),
      (error) => setError(error)
    );

    console.log(qualifications);
    return () => unsubscribe();
  }, [doctorId]);

  useEffect(() => {
    const collectionName = "Experience";
    const filterField = "userId";

    const unsubscribe = getDocument(
      collectionName,
      filterField,
      doctorId,
      (docs) => setExperiences(docs),
      (error) => setError(error)
    );

    console.log(experiences);
    return () => unsubscribe();
  }, [doctorId]);

  return (
    <ScrollView style={styles.container}>
      {hasQualifications ? (
        <View style={styles.section}>
          <Text style={styles.header}>Qualifications:</Text>
          {qualifications.map((qual, index) => (
            <Text key={index} style={styles.detailText}>
              {`${qual.degreeName}, ${qual.institute}, ${qual.passingYear}`}
            </Text>
          ))}
        </View>
      ) : (
        <Text style={styles.noDataText}>No Qualifications Available</Text>
      )}

      {hasExperiences ? (
        <View style={styles.section}>
          <Text style={styles.header}>Experiences:</Text>
          {experiences.map((exp, index) => (
            <Text key={index} style={styles.detailText}>
              {`${exp.clinic}, ${exp.startYear}-${exp.endYear}`}
            </Text>
          ))}
        </View>
      ) : (
        <Text style={styles.noDataText}>No Experiences Available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    lineHeight: 24,
  },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
});

export default DoctorDetailsScreen;
