export interface ICompany {
  id: string,
  name: string,
  ownerId: string,
}
export type CompanyTypes = 'company/findById' | 'company/findAll' | 'company/create'
export interface ICompanyReducer {
  type: CompanyTypes,
  payload: Partial<ICompany>
}