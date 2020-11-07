import { IUser, IUserReducer } from "./types";

export const findByCompanyId = (companyId: string): IUserReducer => ({
  type: 'user/findAllByCompanyId',
  payload: {
    companyId
  }
})


export const findById = (id: string): IUserReducer => ({
  type: 'user/findById',
  payload: {
    id
  }
})

export const create = (user: IUser): IUserReducer => ({
  type: 'user/create',
  payload: user
})


export const login = ({ email, password }: Pick<IUser, 'email' | 'password'>): IUserReducer => ({
  type: 'user/login',
  payload: {
    email,
    password
  }
})