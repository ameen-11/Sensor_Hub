import { useState, useEffect } from 'react';
import { gyroscope, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { Subscription } from 'rxjs';

interface GyroscopeData {
x: number;
y: number;
z: number;
timestamp: number;
}

const useGyrometer = () => {
const [gyroscopeData, setGyroscopeData] = useState<GyroscopeData>({
x: 0,
y: 0,
z: 0,
timestamp: Date.now()
});
const [subscription, setSubscription] = useState<Subscription | null>(null);
const [gyroscopeSamples, setGyroscopeSamples] = useState<Array<GyroscopeData>>([]);
const [samplingInterval, setSamplingInterval] = useState<NodeJS.Timeout | null>(null);

const startGyroscope = () => {
setUpdateIntervalForType(SensorTypes.gyroscope, 400);

const newSubscription = gyroscope.subscribe(
({ x, y, z }) => {
const timestamp = Date.now();
const newData = { x, y, z, timestamp };
console.log('Gyroscope data:', newData);
setGyroscopeData(newData);
},
(error) => console.log('The sensor is not available', error)
);

setSubscription(newSubscription);
};

const startSamplingg = () => {
startGyroscope();
const interval = setInterval(() => {
setGyroscopeSamples(prevSamples => [...prevSamples, gyroscopeData]);
console.log('Sample added:', gyroscopeData);
}, 1000);

setSamplingInterval(interval);

setTimeout(() => {
clearInterval(interval);
setSamplingInterval(null);
stopGyroscope();
console.log('Collected samples:', gyroscopeSamples);
}, 300000); // 5 minutes = 300000 milliseconds
  };

const stopSamplingg = () => {
if (samplingInterval) {
clearInterval(samplingInterval);
setSamplingInterval(null);
}
stopGyroscope();
};

const stopGyroscope = () => {
if (subscription) {
subscription.unsubscribe();
setSubscription(null);
setGyroscopeData({
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
gyroscopeData,
gyroscopeSamples,
startSamplingg,
stopSamplingg,
};
};

export default useGyrometer;
