import React from 'react';
import { format } from 'date-fns';
import { Card, Paragraph } from 'react-native-paper';
// import { Container } from './styles';
export interface IMessageCard {
  name: string;
  date?: string;
  photo: string;
  message: string;
}
const MessageCard: React.FC<IMessageCard> = ({
  name,
  date,
  message,
  photo
}) => {
  return (
    <Card>
      <Card.Cover source={{ uri: photo }} />
      <Card.Title title={name} subtitle={date ? format(new Date(date), 'hh:mm - dd/MM/yyyy') : ''} />
      <Card.Content>
        <Paragraph>{message}</Paragraph>
      </Card.Content>
    </Card>
  );
}

export default MessageCard;