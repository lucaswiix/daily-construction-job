import { ICompanyReducer } from "./types";

export const findById = (id: string): ICompanyReducer => ({
  type: 'company/findById',
  payload: {
    id
  }
})
