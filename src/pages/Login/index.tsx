import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { DismissKeyboard } from '../../components/DismissKeyboard';
import { IUser } from '../../redux/users/types';
import { styles } from './styles';



const Login: React.FC<any> = ({ navigation }) => {
  const [getEmail, setEmail] = useState('');
  const [getPassword, setPassword] = useState('');
  const [error, setError] = useState('');
  const users: IUser[] = useSelector(state => state.user.data)

  async function isUserAuthenticated() {
    let auth = await AsyncStorage.getItem('user');
    if (!auth) {
      AsyncStorage.clear();
      return;
    }
    navigation.navigate('Main');
  }

  useEffect(() => {
    isUserAuthenticated()
  }, []);

  async function handleLogin() {
    try {
      const user = users.find(user => user.email === getEmail && user.password === getPassword);
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        navigation.navigate('Main');
      } else {
        setPassword('');
        setError('Usuário não encontrado =(');
      }
    } catch (error) {
      console.log(error);
      setPassword('');
      setError('Aconteceu algum erro.');
    }
  }

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS == "ios"}
        style={styles.container}
      >
        <View style={styles.box}>
          <Text style={styles.title}>
            Diário de obra
            </Text>
        </View>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#999"
          style={styles.input}
          value={getEmail}
          onChangeText={setEmail}
        />

        <TextInput
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Senha"
          placeholderTextColor="#999"
          style={styles.input}
          value={getPassword}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.buttonError}>{error}</Text>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
}

export default Login;