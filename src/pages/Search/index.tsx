import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import MessageCard from '../../components/MessageCard';
import { authHook } from '../../hooks/Auth';
import { ICompany } from '../../redux/companies/types';
import { IMessage } from '../../redux/messages/types';

// import { Container } from './styles';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { user, getUser, loading, company } = authHook();
  const reduxMessages: IMessage[] = useSelector(state => state.message.data);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    getUser();
    findByQuery()
  }, [])

  const findByQuery = (query?: string) => {
    setSearchQuery(query || '');
    setMessages([]);
    if (user && company) {
      const msgs = reduxMessages.filter(msg =>
        (msg.companyId === user.companyId)
        &&
        ((query && query.length > 0) ? msg.message.toLowerCase().indexOf(query.toLowerCase()) > -1 : true));

      setMessages(msgs);
    }
  }


  const renderItem = ({ item }: { item: IMessage }) => {
    return (
      <View style={{
        padding: 20,
      }}>
        <MessageCard name={company?.name || ''} photo={item.photo} message={item.message} date={item.createdAt} />
      </View>
    )
  };


  return (
    <>
      <View style={{
        justifyContent: 'center'
      }}>
        <Searchbar
          placeholder="Search"
          onChangeText={query => findByQuery(query)}
          value={searchQuery}
        />
      </View>
      {messages.length > 0 ?
        (
          <FlatList
            data={messages.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />

        ) : searchQuery != null && (
          <View style={{
            justifyContent: "center",
            padding: 20
          }}>
            <Text>
              Nenhuma mensagem encontrada =(
          </Text>
          </View>
        )}
    </>);
}

export default Search;