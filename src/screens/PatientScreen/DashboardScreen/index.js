import { Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useFirestore } from "../../../hooks/useFirestore";
import { useUserContext } from "../../../UserContext";
import styles from "../PatientStyles";

export default function DashboardScreen(props) {
  console.log("Patient Dashboard Running");
  const { getDocument } = useFirestore();
  const [userData, setUserData] = useState(null);
  const { userID } = useUserContext();
  const [appointmentData, setAppointmentData] = useState(null);

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
  }, [userID]);

  useEffect(() => {
    const collectionName = "Appointment";
    const filterField = "patientId";
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
      <View style={[styles.splitterDash, { flex: 0.8 }]}>
        <Text
          style={[
            styles.header,
            {
              backgroundColor: "#8fd7c7",
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
              justifyContent: "center",
              backgroundColor: "#8fd7c7",
              margin: 5,
              padding: 5,
              flex: 1,
            }}
          >
            <Text>Name: {userData.name}</Text>
            <Text>Email: {userData.email}</Text>
            <Text>Contact: {userData.contact}</Text>
            <Text>User Type: {userData.userType}</Text>
          </View>
        )}
      </View>

      <View style={styles.splitterDash}>
        <Text
          style={[
            styles.header,
            {
              backgroundColor: "#8fcde2",
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
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => (
              <View
                style={[
                  styles.profileCard,
                  {
                    backgroundColor: "#8fcde2",
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
              backgroundColor: "lightyellow",
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
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => (
              <View
                style={[
                  styles.profileCard,
                  {
                    backgroundColor: "lightyellow",
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
