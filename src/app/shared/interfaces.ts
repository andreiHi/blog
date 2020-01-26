export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}
export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}
export class Post {
  id?: number;
  title: string;
  text: string;
  date: Date;
  author: string;
}
