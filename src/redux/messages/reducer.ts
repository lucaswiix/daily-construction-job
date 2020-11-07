import { addHours } from 'date-fns';
import { IMessage, IMessageReducer } from './types';


export const INITIAL_STATE: { data: IMessage[] } = {
  data: [
    {
      id: '1',
      companyId: '1',
      ownerId: '1',
      message: 'Eae galerinha beleza?',
      photo: 'https://www.rhoadeslegal.com/files/2019/08/crush-injuries-construction-site-200x200.jpg',
      createdAt: addHours(new Date, 1).toString(),
    },
    {
      id: '2',
      companyId: '1',
      ownerId: '1',
      message: 'Show demais!?',
      photo: 'https://www.rhoadeslegal.com/files/2019/08/crush-injuries-construction-site-200x200.jpg',
      createdAt: addHours(new Date, 2).toString(),

    },
    {
      id: '3',
      companyId: '2',
      ownerId: '2',
      message: 'kKKKKK IRADO?',
      photo: 'https://www.rhoadeslegal.com/files/2019/08/crush-injuries-construction-site-200x200.jpg',
      createdAt: addHours(new Date, 3).toString(),
    },
  ],
}

export default function users(state = INITIAL_STATE, { type, payload }: IMessageReducer) {
  switch (type) {
    case 'message/create':
      return {
        data:
          [
            ...state.data,
            {
              ...payload,
            }]
      }
    case 'message/findAllByCompanyId':
      return state.data.filter(user => user.companyId === payload.companyId)
    default:
      return state;
  }
}