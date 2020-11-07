import React, { useEffect, useState } from 'react';
import { Platform, Alert, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { create } from '../../redux/messages/actions';
import { IUser } from '../../redux/users/types';
import { ICompany } from '../../redux/companies/types';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, Button, Snackbar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';

const AddMessage: React.FC = ({ navigation }) => {
  const [user, setUser] = useState<IUser>();
  const companies: ICompany[] = useSelector(state => state.company.data);
  const [responseMsg, setResponseMsg] = useState<string>('');
  const [image, setImage] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>()
  const dispatch = useDispatch();


  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setUser(JSON.parse(user));
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const hangleSubmitMessage = async () => {

    const company = user ? companies.find(company => company.ownerId === user.id) : null;
    if (message && user && company) {
      try {
        dispatch(create({
          message,
          photo: image || '',
          ownerId: user.id,
          companyId: company.id
        }))
        setVisible(true);
        setResponseMsg('História adicionada com sucesso.')
        navigation.navigate('Dashboard');
      } catch (error) {
        console.log(error);
      }
    } else {

    }
  }


  return (
    <>
      <Card style={{
        padding: 20
      }}>
        {image && <Card.Cover source={{ uri: image }} />}
        <Card.Title title={user && companies.find(company => company.ownerId === user.id)?.name} subtitle={format(new Date, 'hh:mm - dd/MM/yyyy')} />

        <Card.Content>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Descrição"
            placeholderTextColor="#999"
            style={styles.input}
            value={message}
            onChangeText={setMessage}
          />
        </Card.Content>
        <Card.Actions style={{
          justifyContent: 'space-between'
        }}>
          <View>

            <Button onPress={pickImage}> <AntDesign name="camerao" size={24} /></Button>
          </View>
          <View>

            <Button onPress={() => hangleSubmitMessage()}>Enviar</Button>
          </View>

        </Card.Actions>

      </Card>
      <Snackbar
        visible={visible}
        duration={2000}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'X',
          onPress: () => onDismissSnackBar
        }}>
        {responseMsg}
      </Snackbar>
    </>
  );
}

export default AddMessage;