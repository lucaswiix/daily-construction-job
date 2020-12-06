import { INITIAL_STATE as users } from '../users/reducer';
import { ICompany, ICompanyReducer } from './types';

export const INITIAL_STATE: { data: ICompany[] } = {
  data: [
    {
      id: '1',
      name: 'Portal do Sol Construtora',
      ownerId: '1',
    },
    {
      id: '2',
      name: 'MV Construtora',
      ownerId: '3',
    },
    {
      id: '3',
      name: 'MouraDoB',
      ownerId: '2',
    },
  ],
}

export default function companies(state = INITIAL_STATE, { type, payload }: ICompanyReducer) {
  switch (type) {
    case 'company/create':
      return {
        data:
          [
            ...state.data,
            {
              ...payload,
            }]
      }
    case 'company/findAll':
      return state.data;
    case 'company/findById':
      return state.data.filter(company => company.id === payload.id);
    default:
      return state;
  }
}