import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

// import { Container } from './styles';

export default function Settings({ navigation }: any) {
  const [isSignout, setisSignout] = useState<boolean>(false);
  async function logoutUser() {
    await AsyncStorage.clear()
  }

  function handleLogout() {
    if(isSignout){
      return;
    }
    setisSignout(true)
    logoutUser()
    setTimeout(() => {
      navigation.navigate('Login')
    }, 2000);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', margin: 30 }}>

      <Button onPress={() => handleLogout()}>
        {isSignout ? 'Saindo... ' : 'Deseja sair?'}
      </Button>
      {isSignout && <Text >Encerrando a sessão...</Text>}
    </View>
  );
}
