
import { useState, useEffect } from 'react';
import { magnetometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { Subscription } from 'rxjs';

interface MagnetometerData {
x: number;
y: number;
z: number;
timestamp: number;
}

const useMagnetometer = () => {
const [magnetometerData, setMagnetometerData] = useState<MagnetometerData>({
x: 0,
y: 0,
z: 0,
timestamp: Date.now()
});
const [subscription, setSubscription] = useState<Subscription | null>(null);
const [magnetometerSamples, setMagnetometerSamples] = useState<Array<MagnetometerData>>([]);
const [samplingInterval, setSamplingInterval] = useState<NodeJS.Timeout | null>(null);

const startMagnetometer = () => {
setUpdateIntervalForType(SensorTypes.magnetometer, 400);

const newSubscription = magnetometer.subscribe(
({ x, y, z }) => {
const timestamp = Date.now();
const newData = { x, y, z, timestamp };
console.log('Magnetometer data:', newData);
setMagnetometerData(newData);
},
(error) => console.log('The sensor is not available', error)
);

setSubscription(newSubscription);
};

const startSamplingm = () => {
startMagnetometer();
const interval = setInterval(() => {
setMagnetometerSamples(prevSamples => [...prevSamples, magnetometerData]);
console.log('Sample added:', magnetometerData);
}, 1000);

setSamplingInterval(interval);

setTimeout(() => {
clearInterval(interval);
setSamplingInterval(null);
stopMagnetometer();
console.log('Collected samples:', magnetometerSamples);
}, 300000); // 5 minutes = 300000 milliseconds
  };

const stopSamplingm = () => {
if (samplingInterval) {
clearInterval(samplingInterval);
setSamplingInterval(null);
}
stopMagnetometer();
};

const stopMagnetometer = () => {
if (subscription) {
subscription.unsubscribe();
setSubscription(null);
setMagnetometerData({
x: 0,
y: 0,
z: 0,
timestamp: Date.now()
});
}
};

useEffect(() => {
return () => {
if (subscription) {
subscription.unsubscribe();
}
if (samplingInterval) {
clearInterval(samplingInterval);
}
};
}, [subscription, samplingInterval]);

return {
magnetometerData,
magnetometerSamples,
startSamplingm,
stopSamplingm,
};
};

export default useMagnetometer;
