import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const Profile = () => {
    const [userInfo, setUserInfo] = useState<FirebaseAuthTypes.User | null>(null);
    
    useEffect(() => {
        const user = auth().currentUser;
        setUserInfo(user);
    }, []);

    if (!userInfo) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.info}>{userInfo.email}</Text>
            <Text style={styles.label}>UID:</Text>
            <Text style={styles.info}>{userInfo.uid}</Text>
            {/* Display other user information fetched from Firestore */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f0f0f0",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        fontSize: 18,
        color: "#666",
    },
    label: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#333",
    },
    info: {
        fontSize: 18,
        color: "#555",
        marginBottom: 15,
    },
});

export default Profile;

