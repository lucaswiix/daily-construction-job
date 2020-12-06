import { subHours } from 'date-fns';
import { IMessage, IMessageReducer } from './types';

export const INITIAL_STATE: { data: IMessage[] } = {
  data: [
    {
      id: '1',
      companyId: '1',
      ownerId: '1',
      message: 'Etapa 1: Projeto',
      photo: 'https://i.ibb.co/H7dxmM2/Whats-App-Image-2020-12-06-at-00-07-12.jpg',
      createdAt: subHours(new Date, 1).toString(),
    },
    {
      id: '2',
      companyId: '1',
      ownerId: '1',
      message: 'Etapa 2: Verificação do terreno e sondagem',
      photo: 'https://i.ibb.co/NWxn1SC/Whats-App-Image-2020-12-06-at-00-05-27.jpg',
      createdAt: subHours(new Date, 2).toString(),

    },
    {
      id: '3',
      companyId: '1',
      ownerId: '1',
      message: 'Etapa 03: implantação da obra e locação',
      photo: 'https://i.ibb.co/Z8b5DYC/Whats-App-Image-2020-12-06-at-00-06-27.jpg',
      createdAt: subHours(new Date, 3).toString(),

    },
    {
      id: '4',
      companyId: '2',
      ownerId: '2',
      message: 'Etapa 1: Projeto',
      photo: 'https://i.ibb.co/H7dxmM2/Whats-App-Image-2020-12-06-at-00-07-12.jpg',
      createdAt: subHours(new Date, 1).toString(),
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