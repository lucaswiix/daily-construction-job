import AsyncStorage from "@react-native-community/async-storage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ICompany } from "../../redux/companies/types";
import { IUser } from "../../redux/users/types";

export const authHook = (): {
  user: IUser | undefined,
  getUser: () => void,
  loading: boolean,
  company: ICompany | undefined
} => {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(false);
  const [company, setCompany] = useState<ICompany>();
  const companies: ICompany[] = useSelector(state => state.company.data);
  async function getUser() {
    setLoading(true)
    const user = await AsyncStorage.getItem('user');
    if (user) {
      const parsedUser: IUser = JSON.parse(user)
      setUser(JSON.parse(user));
      setCompany(companies.find(c => c.ownerId === parsedUser.id));
    }
    setLoading(false);
  }


  return {
    user,
    getUser,
    loading,
    company
  }
};