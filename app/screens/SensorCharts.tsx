import React, { useEffect, useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, RefreshControl, Text } from "react-native";
import { getDBConnection, getData } from "../db-service";
import Spacing from "../constants/Spacing";
import Chart from "../components/Chart";
import { SQLiteDatabase } from "react-native-sqlite-storage";

const SensorCharts = () => {
  const [sensorDataFromDatabase, setData] = useState<SensorDataResponse[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const presentData = async () => {
    try {
      const db: SQLiteDatabase | undefined = await getDBConnection(); // Include undefined as a possible return type
      if (db) {
        const d = await getData(db); // Assuming getData accepts a valid SQLiteDatabase
        setData(d);
        //setData(d);
      } else {
        console.error("Database connection is undefined");
        return;
      }
    } catch (error) {
      console.error("Error in presentData:", error);
    } finally {
      setRefreshing(false); // Ensure refreshing state is stopped
    }
    //server calls
    //  try {
    //    const userId = auth().currentUser?.uid;
    //    if (!userId) {
    //      console.error("User ID is not available");
    //      return;
    //    }

    //    const response = await axios.get<{ data: SensorDataResponse[] }>(
    //      "http://10.0.2.2:8000/get_data",
    //      { params: { userid: userId } }
    //    );

    //    setData(response.data.data);
    //  } catch (error: any) {
    //    console.error("Error fetching data:", error.message);
    //  } finally {
    //    setRefreshing(false);
    //  }
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    presentData();
  }, []);

  useEffect(() => {
    presentData();
  }, []);

  // Prepare data for the chart
  const prepareChartData = (sensorData: SensorDataResponse[] | undefined, key: keyof SensorDataResponse) => {
    if (!sensorData || sensorData.length === 0) {
      // Return a placeholder data point if no data is available
      return [{ value: 0, label: "nil" }];
    }
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
        {sensorDataFromDatabase && sensorDataFromDatabase.length > 0 ? (
          <>
            <Chart data={prepareChartData(sensorDataFromDatabase, "ax")} title="Accelerometer X (ax)" />
            <Chart data={prepareChartData(sensorDataFromDatabase, "ay")} title="Accelerometer Y (ay)" />
            <Chart data={prepareChartData(sensorDataFromDatabase, "az")} title="Accelerometer Z (az)" />
            <Chart data={prepareChartData(sensorDataFromDatabase, "pitch")} title="Pitch" />
            <Chart data={prepareChartData(sensorDataFromDatabase, "roll")} title="Roll" />
            <Chart data={prepareChartData(sensorDataFromDatabase, "azimuth")} title="Azimuth" />
            <Chart data={prepareChartData(sensorDataFromDatabase, "avx")} title="Angular Velocity X (avx)" />
            <Chart data={prepareChartData(sensorDataFromDatabase, "avy")} title="Angular Velocity Y (avy)" />
            <Chart data={prepareChartData(sensorDataFromDatabase, "avz")} title="Angular Velocity Z (avz)" />
            <Chart data={prepareChartData(sensorDataFromDatabase, "mfx")} title="Magnetic Field X (mfx)" />
            <Chart data={prepareChartData(sensorDataFromDatabase, "mfy")} title="Magnetic Field Y (mfy)" />
            <Chart data={prepareChartData(sensorDataFromDatabase, "mfz")} title="Magnetic Field Z (mfz)" />
          </>
        ) : (
          // Render "No data available" message when no data is present
          <View style={styles.container}>
            <Text>Data Loading</Text>
          </View>
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

