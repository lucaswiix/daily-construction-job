import { IMessage, IMessageReducer } from "./types";
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
export const create = (message: Pick<IMessage, 'message' | 'photo' | 'ownerId' | 'companyId'>): IMessageReducer => ({
  type: 'message/create',
  payload: {
    ...message,
    id: uuid(),
    createdAt: String(new Date),
  }
})
