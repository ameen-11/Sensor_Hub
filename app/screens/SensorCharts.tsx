import React, { useEffect, useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, RefreshControl } from "react-native";
import axios from "axios";
import auth from "@react-native-firebase/auth";
import Spacing from "../constants/Spacing";
import Chart from "../components/Chart";

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

const SensorCharts = () => {
  const [data, setData] = useState<SensorDataResponse[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) {
        console.error("User ID is not available");
        return;
      }

      const response = await axios.get<{ data: SensorDataResponse[] }>(
        "http://10.0.2.2:8000/get_data",
        { params: { userid: userId } }
      );

      setData(response.data.data);
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
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

  // Prepare data for the chart
  const prepareChartData = (sensorData: SensorDataResponse[], key: keyof SensorDataResponse) => {
    return sensorData.map((item) => ({
      value: item[key] as number,
      label: new Date(item.timestamp).toLocaleTimeString(), // Convert timestamp to time
    }));
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View>
        {data && (
          <>
            <Chart data={prepareChartData(data, "ax")} title="Accelerometer X (ax)" />
            <Chart data={prepareChartData(data, "ay")} title="Accelerometer Y (ay)" />
            <Chart data={prepareChartData(data, "az")} title="Accelerometer Z (az)" />
            <Chart data={prepareChartData(data, "pitch")} title="Pitch" />
            <Chart data={prepareChartData(data, "roll")} title="Roll" />
            <Chart data={prepareChartData(data, "azimuth")} title="Azimuth" />
            <Chart data={prepareChartData(data, "avx")} title="Angular Velocity X (avx)" />
            <Chart data={prepareChartData(data, "avy")} title="Angular Velocity Y (avy)" />
            <Chart data={prepareChartData(data, "avz")} title="Angular Velocity Z (avz)" />
            <Chart data={prepareChartData(data, "mfx")} title="Magnetic Field X (mfx)" />
            <Chart data={prepareChartData(data, "mfy")} title="Magnetic Field Y (mfy)" />
            <Chart data={prepareChartData(data, "mfz")} title="Magnetic Field Z (mfz)" />
            <Chart data={prepareChartData(data, "latitude")} title="Latitude" />
            <Chart data={prepareChartData(data, "longitude")} title="Longitude" />
            <Chart data={prepareChartData(data, "altitude")} title="Altitude" />
            <Chart data={prepareChartData(data, "hacc")} title="Horizontal Accuracy (hacc)" />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: Spacing,
  },
});

export default SensorCharts;

