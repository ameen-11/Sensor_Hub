import { useState, useEffect } from 'react';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { Subscription } from 'rxjs';

interface AccelerometerData {
x: number;
y: number;
z: number;
pitch: number;
roll: number;
azimuth: number;
timestamp: number;
}

const useAccelerometer = () => {
const [accelerometerData, setAccelerometerData] = useState<AccelerometerData>({
x: 0,
y: 0,
z: 0,
pitch: 0,
roll: 0,
azimuth: 0,
timestamp: Date.now()
});
const [subscription, setSubscription] = useState<Subscription | null>(null);
const [accelerometerSamples, setAccelerometerSamples] = useState<Array<AccelerometerData>>([]);
const [samplingInterval, setSamplingInterval] = useState<NodeJS.Timeout | null>(null);

const calculatePitch = (x: number, y: number, z: number) => {
return Math.atan2(-x, Math.sqrt(y * y + z * z)) * (180 / Math.PI);
};

const calculateRoll = (x: number, y: number) => {
return Math.atan2(y, x) * (180 / Math.PI);
};

const calculateAzimuth = (x: number, y: number, z: number) => {
return Math.atan2(z, Math.sqrt(x * x + y * y)) * (180 / Math.PI);
};

const startAccelerometer = () => {
setUpdateIntervalForType(SensorTypes.accelerometer, 400);

const newSubscription = accelerometer.subscribe(
({ x, y, z }) => {
const pitch = calculatePitch(x, y, z);
const roll = calculateRoll(x, y);
const azimuth = calculateAzimuth(x, y, z);
const timestamp = Date.now();
const newData = { x, y, z, pitch, roll, azimuth, timestamp };
console.log('Accelerometer data:', newData);
setAccelerometerData(newData);
},
(error) => console.log('The sensor is not available', error)
);

setSubscription(newSubscription);
};

const startSampling = () => {
startAccelerometer();
const interval = setInterval(() => {
setAccelerometerSamples(prevSamples => [...prevSamples, accelerometerData]);
console.log('Sample added:', accelerometerData);
}, 1000);

setSamplingInterval(interval);

setTimeout(() => {
clearInterval(interval);
setSamplingInterval(null);
stopAccelerometer();
console.log('Collected samples:', accelerometerSamples);
}, 300000); // 5 minutes = 300000 milliseconds
    };

const stopSampling = () => {
if (samplingInterval) {
clearInterval(samplingInterval);
setSamplingInterval(null);
}
stopAccelerometer();
};

const stopAccelerometer = () => {
if (subscription) {
subscription.unsubscribe();
setSubscription(null);
setAccelerometerData({
x: 0,
y: 0,
z: 0,
pitch: 0,
roll: 0,
azimuth: 0,
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
accelerometerData,
accelerometerSamples,
startSampling,
stopSampling,
};
};

export default useAccelerometer;
