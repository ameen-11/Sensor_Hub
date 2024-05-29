// app/data/UseAccelerometer.ts (or UseAccelerometer.tsx)
import { Accelerometer } from 'react-native-sensors';

let accelerometerSubscription: any = null;

const startAccelerometer = (updateInterval: number, onData: (data: any) => void, onError: (error: any) => void) => {
  if (!accelerometerSubscription) {
    const accelerometer = new Accelerometer({ updateInterval });

    accelerometerSubscription = accelerometer.subscribe(onData, onError);
  }
};

const stopAccelerometer = () => {
  if (accelerometerSubscription) {
    accelerometerSubscription.unsubscribe();
    accelerometerSubscription = null;
  }
};

export default { startAccelerometer, stopAccelerometer };
