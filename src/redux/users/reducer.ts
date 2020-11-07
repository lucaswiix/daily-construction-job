import { INITIAL_STATE as companies } from '../companies/reducer';
import { IUser, IUserReducer } from './types';


export const INITIAL_STATE: { data: IUser[] } = {
  data: [
    {
      id: '1',
      name: 'Lucas',
      email: "m@m.com",
      companyId: '1',
      password: "123456",
    },
    {
      id: '2',
      name: 'Henrique',
      email: "n@m.com",
      companyId: '1',
      password: "123456",
    },
    {
      id: '3',
      name: 'Pedro',
      email: "b@m.com",
      companyId: '2',
      password: "123456",
    },
  ],
}

export default function users(state = INITIAL_STATE, { type, payload }: IUserReducer) {
  switch (type) {
    case 'user/create':
      return {
        data:
          [
            ...state.data,
            {
              ...payload,
            }]
      }
    case 'user/findAll':
      return state.data;
    case 'user/login':
      return state.data.find(user => user.email === payload.email && user.password === payload.password);
    case 'user/findAllByCompanyId':
      return state.data.filter(user => user.companyId === payload.companyId)
    case 'user/findById':
      return state.data.find(user => user.id === payload.id)
    default:
      return state;
  }
}