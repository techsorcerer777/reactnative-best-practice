import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const CTX = React.createContext();

export {CTX};

export default function Store(props) {
  const [token, setToken] = useState(null);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    _bootstrapAsync();
  });

  const _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const userSkip = await AsyncStorage.getItem('userSkip');
    setToken(userToken);
    setSkip(JSON.parse(userSkip));
  };

  const _authenticate = async accessToken => {
    await AsyncStorage.setItem('userToken', accessToken);
  };

  const _logout = async () => {
    // await AsyncStorage.removeItem('userToken');
    await AsyncStorage.clear();
  };

  const _seen = async () => {
    await AsyncStorage.setItem('userSkip', JSON.stringify(true));
  };

  return (
    <CTX.Provider value={{token, _authenticate, _logout, skip, _seen}}>
      {props.children}
    </CTX.Provider>
  );
}
