import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { IUser } from '../../redux/users/types';
import { IMessage } from '../../redux/messages/types';
import { DefaultRootState, useSelector } from 'react-redux';
import MessageCard from '../../components/MessageCard';
import { ICompany } from '../../redux/companies/types';


const Dashboard: React.FC = ({ navigation }: any) => {
  const [user, setUser] = useState<IUser>();
  const [authCompany, setAuthCompany] = useState<ICompany>();
  const messages: IMessage[] = useSelector(state => state.message.data);
  const companies: ICompany[] = useSelector(state => state.company.data);

  useEffect(() => {
    async function checkLogin() {
      const user = await AsyncStorage.getItem('user');
      if (!user) {
        await AsyncStorage.clear();
        return navigation('Login');
      }
      const userData = JSON.parse(user);
      const companyData = companies.find(company => company.id === userData.companyId);
      setAuthCompany(companyData)
      setUser(userData);
    }
    checkLogin();
  });

  const renderItem = ({ item }: { item: IMessage }) => {
    return (

      <View style={{
        padding: 20,
      }}>
        <MessageCard name={authCompany?.name || ''} photo={item.photo} message={item.message} date={item.createdAt} />
      </View>
    )
  };

  return (
    <SafeAreaView>
      {user && (

        <FlatList
          data={messages.filter(message => message.companyId === user.companyId).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

      )}

    </SafeAreaView >
  );
}


export default Dashboard;