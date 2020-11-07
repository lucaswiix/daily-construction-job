import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ICompany } from '../../redux/companies/types';
import { IUser } from '../../redux/users/types';
import { AntDesign } from '@expo/vector-icons';

const PlusMessage: React.FC = ({ onPress }) => {
  const companies: ICompany[] = useSelector(state => state.company.data);

  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    const getData = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const userData: IUser = JSON.parse(user);
        setUser(userData);

      }
    }
    getData();
  }, []);

  return (
    <>
      {user && companies.some(c => c.ownerId === user.id) && (
        <AntDesign name="pluscircleo" onPress={onPress} size={24} color="white" style={{
          padding: 10
        }} />
      )}
    </>
  );
}

export default PlusMessage;