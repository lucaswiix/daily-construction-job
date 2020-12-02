import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, List } from 'react-native-paper';
import { IUser } from '../../redux/users/types';
import { AntDesign } from '@expo/vector-icons';


export default function Settings({ navigation }: any) {
  const [isSignout, setisSignout] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();
  async function logoutUser() {
    await AsyncStorage.clear()
  }

  useEffect(() => {
    async function checkLogin() {
      const user = await AsyncStorage.getItem('user');
      if (!user) {
        await AsyncStorage.clear();
        return navigation('Login');
      }
      const userData = JSON.parse(user);
      setUser(userData);
    }
    checkLogin();

  }, [])

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
    <View style={{ margin: 10 }}>

<List.Section>
    <List.Subheader>Configurações</List.Subheader>
    <List.Item title={`Usuário: ${user?.name}`} left={() => <AntDesign name="user" size={24} />} />
    <List.Item
      title={`E-mail: ${user?.email}`}
      left={() => <AntDesign name="mail" size={24} />}
    />
    <List.Item title={`Sair`} onPress={() => handleLogout()} left={() => <AntDesign name="logout" size={24} />} />

  </List.Section>
  
      {isSignout && <Text >Encerrando a sessão...</Text>}
    </View>
  );
}
