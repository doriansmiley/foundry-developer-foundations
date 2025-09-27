import { Session as SessionDaoType } from './sessionsDao';

export type Message = {
  system?: string;
  user?: string;
};

export type Session = SessionDaoType;
