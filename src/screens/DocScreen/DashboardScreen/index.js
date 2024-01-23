import React, { useState, useEffect } from "react";
import { useFirestore } from "../../../hooks/useFirestore";
import { useUserContext } from "../../../UserContext";
import styles from "../DocStyles";
import { Text, View, FlatList } from "react-native";

export default function DashboardScreen() {
  console.log("Doctor Dashboard Running");

  const { getDocument } = useFirestore();
  const [userData, setUserData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const { userID } = useUserContext();

  useEffect(() => {
    const collectionName = "UserProfile";
    const filterField = "userId";
    const unsubscribe = getDocument(
      collectionName,
      filterField,
      userID,
      (docs) => setUserData(docs[0]),
      (error) => setError(error)
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const collectionName = "Appointment";
    const filterField = "doctorId";
    const unsubscribe = getDocument(
      collectionName,
      filterField,
      userID,
      (docs) => setAppointmentData(docs),
      (error) => setError(error)
    );
    console.log(appointmentData);
    return () => unsubscribe();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.splitterDash}>
        <Text
          style={[
            styles.header,
            {
              backgroundColor: "#fde1da",
              margin: 5,
              padding: 5,
              paddingVertical: 10,
            },
          ]}
        >
          My Profile
        </Text>
        {userData && (
          <View
            style={{
              backgroundColor: "#fde1da",

              margin: 5,
              padding: 5,
            }}
          >
            <Text>Name: {userData.name}</Text>
            <Text>Email: {userData.email}</Text>
            <Text>Contact: {userData.contact}</Text>
            <Text>User Type: {userData.userType}</Text>

            <Text>Speciality: {userData.speciality}</Text>
            <Text>Location: {userData.location}</Text>
          </View>
        )}
      </View>

      <View style={styles.splitterDash}>
        <Text
          style={[
            styles.header,
            {
              backgroundColor: "#e4ede7",
              margin: 5,
              padding: 5,
              paddingVertical: 10,
            },
          ]}
        >
          Upcoming Appointments
        </Text>

        {appointmentData !== null && (
          <FlatList
            data={appointmentData.filter((item) => item.status === "accepted")}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
              <View
                style={[
                  styles.profileCard,
                  {
                    backgroundColor: "#e4ede7",
                    height: "90%",
                    width: 200,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Text>Time: {item.appmtTime}</Text>
                <Text>Date: {item.appmtDate}</Text>
                <Text>Msg: {item.customMessage}</Text>
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.splitterDash}>
        <Text
          style={[
            styles.header,
            {
              backgroundColor: "ivory",
              margin: 5,
              padding: 5,
              paddingVertical: 10,
            },
          ]}
        >
          Pending Request
        </Text>

        {appointmentData !== null && (
          <FlatList
            data={appointmentData.filter((item) => item.status === "pending")}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
              <View
                style={[
                  styles.profileCard,
                  {
                    backgroundColor: "ivory",
                    width: 200,
                    height: "90%",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Text>Time: {item.appmtTime}</Text>
                <Text>Date: {item.appmtDate}</Text>
                <Text>Msg: {item.customMessage}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}
