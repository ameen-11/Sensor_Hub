export const startSensors = () => {};
export const stopSensors = () => {};


/*
    const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });

    const [subscription, setSubscription] =useState<Subscription | null>(null);
   git diff --name-only --diff-filter=U
    const startAccelerometer = () => {

        setUpdateIntervalForType(SensorTypes.accelerometer, 400);

   const newSubscription = accelerometer.subscribe(
            ({ x, y, z }) => setAccelerometerData({ x, y, z }),
            (error) => {
                console.log('The sensor is not available', error);
            }
        );

        setSubscription(newSubscription);
    };
    useEffect(() => {
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [subscription]);

    const { x:ax, y:ay, z:az } = accelerometerData;


    const stopAccelerometer = () => {
        if (subscription) {
            subscription.unsubscribe();
            setSubscription(null);
            setAccelerometerData({x:0,y:0,z:0})
        }
    };




    //   gyroscope

    const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
    const [gyroscopeSubscription, setGyroscopeSubscription] = useState(null);
    const startGyroscope = () => {
        setUpdateIntervalForType(SensorTypes.gyroscope, 400);
        const newSubscription = gyroscope.subscribe(
            ({ x, y, z }) => {setGyroscopeData({ x, y, z });
                const roll = Math.atan2(y, x) * (180 / Math.PI);
                setRollData(roll);
            },
            (error) => console.log('The sensor is not available', error)
        );
        setGyroscopeSubscription(newSubscription);
    };
    const stopGyroscope = () => {
        if (gyroscopeSubscription) {
            subscription.unsubscribe();
            setGyroscopeSubscription(null);
            setGyroscopeData({ x: 0, y: 0, z: 0 });
        }
    };

    useEffect(() => {
        return () => {
            if (gyroscopeSubscription) {
                gyroscopeSubscription.unsubscribe();
            }
        };
    }, [subscription]);
    const { x:gx, y:gy, z:gz } = gyroscopeData;
    const [rollData, setRollData] = useState(0);
    // magnetometer
    const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
    const [magnetometerSubscription, setMagnetometerSubscription] = useState(null);

    const startMagnetometer = () => {
        setUpdateIntervalForType(SensorTypes.magnetometer, 400);
        const newSubscription = magnetometer.subscribe(
            ({ x, y, z }) => setMagnetometerData({ x, y, z }),
            (error) => console.log('The magnetometer is not available', error)
        );
        setMagnetometerSubscription(newSubscription);
    };
    const stopmagnetometer = () => {
        if (magnetometerSubscription) {
            subscription.unsubscribe();
            setMagnetometerSubscription(null);
            setMagnetometerData({ x: 0, y: 0, z: 0 });
        }
    };
    useEffect(() => {
        return () => {
            if (magnetometerSubscription) {
                magnetometerSubscription.unsubscribe();
            }
        };
    }, [subscription]);

    const { x:mx, y:my, z:mz } = magnetometerData;



    export 

    const startSensors = () =>{
        startAccelerometer();
        startGyroscope();
        startMagnetometer();
    }
    const stopSensors = () => {
        stopAccelerometer();
        stopGyroscope();
        stopmagnetometer();
    }


*/
