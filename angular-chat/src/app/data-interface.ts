export interface IServerModel {
  success: boolean;
  items: Array<IUserToken | IMessage | IRoom | IUser | IUserRoom> | IParticipator;
  message: string;
}

export interface IUserToken {
  token: string;
  user: IUser;
}

export interface IUser {
  id?: number;
  email?: string;
  login?: string;
  password?: string;
  role?: string;
  ban?: boolean;
  reasonBan?: string;
}

export interface IMessage {
  id?: string;
  message: string;
  userLogin: string;
  idUser: number;
  path?: string;
  createAt: string;
  updateAt: string;
}

export interface IUserToken {
  token: string;
  user: IUser;
}

export interface IUserRoom {
  id?: number;
  roomName: string;
  creator: number;
}

export interface IParticipator {
  idRoom: number;
  participator?: number;
  participators?: Array<number>;
  chatRole?: string;
}

export interface IChatModel {
  roomName: string;
  creatorId: number;
  participator?: Array<number>;
}

export interface IRoom {
  id: number;
  idRoom: number;
  participator: number;
}
