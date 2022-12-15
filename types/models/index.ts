export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  remember_me_token: string;
  created_at: Date;
  updated_at: Date;
}
