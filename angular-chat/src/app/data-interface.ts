export interface IServerModel {
  success: boolean;
  items: Array<IUserToken | IMessage | IRoom | IUser>;
  message: string;
}

export interface IUserToken {
  token: string;
  user: IUser;
}

export interface IUser {
  id?: string;
  email: string;
  login: string;
  password: string;
  role: string;
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

export interface IUserOnline {
  users: Array<string>;
}

export interface IUserData {
  userName: string;
  room: string;
}

export interface IUserRoom {
  roomName: string;
  creatorId: number;
  operator?: boolean;
}

export interface IRoom {
  id: number;
  roomName: string;
  creator: string;
  participator: string;
}
