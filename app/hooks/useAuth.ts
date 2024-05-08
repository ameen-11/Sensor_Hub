import auth from '@react-native-firebase/auth';
import {useState, useEffect} from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

const useAuth = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const unsubscribeFromAuth = auth().onAuthStateChanged(user => {
      //if user not null
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });
    //calls the unsubscribeFromAuth function
    return unsubscribeFromAuth;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }

  return user;
};

export default useAuth;
