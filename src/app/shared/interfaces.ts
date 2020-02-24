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
  id?: string;
  title: string;
  text: string;
  date: Date;
  author: string;
}

export interface FbCreateResponse {
  name: string;
}
