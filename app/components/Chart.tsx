import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface ChartProps {
  data: { value: number; label: string }[];
  title: string;
}

const Chart: React.FC<ChartProps> = ({ data, title }) => {
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={data}
        width={300}  // Adjust the width to fit your layout
        height={200} // Adjust the height to fit your layout
        yAxisThickness={1}
        xAxisThickness={1}
        yAxisLabelWidth={40}
        hideRules={false}  // Show grid lines
        yAxisTextStyle={{ color: '#555', fontSize: 12 }}  // Style for y-axis labels
        xAxisLabelTextStyle={{ color: '#555', fontSize: 12 }}  // Style for x-axis labels
        initialSpacing={10}  // Space before the first data point
        spacing={30}  // Space between data points
        color="#FF6347"  // Color of the line
        thickness={2}  // Thickness of the line
        noOfSections={4}  // Number of horizontal sections (grid lines)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Chart;

