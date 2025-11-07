
export interface UserType {
  message: string;
  data: {
    user_id: number;
    username: string;
    email: string;
    password_hashed?: string;
    address_id: number;
    created_at: string;
    updated_at: string;
    status: string;
    role: 'user' | 'admin';
  }
}
