
export interface IMessage {
  id: string;
  ownerId: string,
  companyId: string,
  message: string,
  photo: string,
  createdAt: string
}
export type MessageTypes = 'message/create' | 'message/findAllByCompanyId'
export interface IMessageReducer {
  type: MessageTypes,
  payload: Partial<IMessage>
}