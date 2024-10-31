import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import axios from "axios";
import auth from "@react-native-firebase/auth";
import Spacing from "../constants/Spacing";

// Define the structure of the response data
interface SensorDataResponse {
  timestamp: string;
  userid: string;
  ax: number;
  ay: number;
  az: number;
  pitch: number;
  roll: number;
  azimuth: number;
  avx: number;
  avy: number;
  avz: number;
  mfx: number;
  mfy: number;
  mfz: number;
  latitude: number;
  longitude: number;
  altitude: number;
  hacc: number;
}

const SensorData: React.FC = () => {
  const [data, setData] = useState<SensorDataResponse[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) {
        console.error('User ID is not available');
        return;
      }

      const response = await axios.get<{ data: SensorDataResponse[] }>('http://10.0.2.2:8000/get_data', {
        params: { userid: userId },
      });
      
      setData(response.data.data);
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    } finally {
      setRefreshing(false);
    }
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Timestamp</Text>
            <Text style={styles.tableHeader}>User ID</Text>
            <Text style={styles.tableHeader}>AX</Text>
            <Text style={styles.tableHeader}>AY</Text>
            <Text style={styles.tableHeader}>AZ</Text>
            <Text style={styles.tableHeader}>Pitch</Text>
            <Text style={styles.tableHeader}>Roll</Text>
            <Text style={styles.tableHeader}>Azimuth</Text>
            <Text style={styles.tableHeader}>AVX</Text>
            <Text style={styles.tableHeader}>AVY</Text>
            <Text style={styles.tableHeader}>AVZ</Text>
            <Text style={styles.tableHeader}>MFX</Text>
            <Text style={styles.tableHeader}>MFY</Text>
            <Text style={styles.tableHeader}>MFZ</Text>
            <Text style={styles.tableHeader}>Latitude</Text>
            <Text style={styles.tableHeader}>Longitude</Text>
            <Text style={styles.tableHeader}>Altitude</Text>
            <Text style={styles.tableHeader}>HACC</Text>
          </View>
          {data && data.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.timestamp}</Text>
              <Text style={styles.tableCell}>{item.userid}</Text>
              <Text style={styles.tableCell}>{item.ax}</Text>
              <Text style={styles.tableCell}>{item.ay}</Text>
              <Text style={styles.tableCell}>{item.az}</Text>
              <Text style={styles.tableCell}>{item.pitch}</Text>
              <Text style={styles.tableCell}>{item.roll}</Text>
              <Text style={styles.tableCell}>{item.azimuth}</Text>
              <Text style={styles.tableCell}>{item.avx}</Text>
              <Text style={styles.tableCell}>{item.avy}</Text>
              <Text style={styles.tableCell}>{item.avz}</Text>
              <Text style={styles.tableCell}>{item.mfx}</Text>
              <Text style={styles.tableCell}>{item.mfy}</Text>
              <Text style={styles.tableCell}>{item.mfz}</Text>
              <Text style={styles.tableCell}>{item.latitude}</Text>
              <Text style={styles.tableCell}>{item.longitude}</Text>
              <Text style={styles.tableCell}>{item.altitude}</Text>
              <Text style={styles.tableCell}>{item.hacc}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: Spacing,
  },
  table: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: Spacing,
  },
  tableRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: Spacing / 4,
  },
  tableHeader: {
    fontWeight: 'bold',
    width: 120,
    textAlign: 'center',
    padding: Spacing / 2,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    backgroundColor: '#f0f0f0',
  },
  tableCell: {
    width: 120,
    textAlign: 'center',
    padding: Spacing / 2,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
});

export default SensorData;

