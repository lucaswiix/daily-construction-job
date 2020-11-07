import React from 'react';
import AsyncStorage from "@react-native-community/async-storage";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DrawerItems } from "react-navigation-drawer";

export const DrawerComponent: React.FC<any> = (props) => {
  const [user, setUser] = useState('');

  async function getName() {
    const user = await AsyncStorage.getItem('user');
    console.log('USER ->', user);
    if (!user) {
      return props.navigation("Login");
    }
    setUser(JSON.parse(user).name);
  }

  useEffect(() => {
    getName()
  }, [])

  return (
    <ScrollView>
      <View style={{
        flex: 1,
        height: 60,
        borderColor: '#000',
        borderBottomWidth: 1,
      }}>

        <Text style={{
          padding: 20,
          fontWeight: 'bold',
          fontSize: 20,
        }}>{user && user}</Text>

      </View>
      <DrawerItems {...props} />
    </ScrollView>
  );
}