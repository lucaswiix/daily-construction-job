
export interface IUser {
  id: string;
  name: string,
  email: string,
  companyId: string,
  password: string,
}
export type UserTypes = 'user/findById' | 'user/findAllByCompanyId' | 'user/create' | 'user/findAll' | 'user/login'
export interface IUserReducer {
  type: UserTypes,
  payload: Partial<IUser>
}