export interface UserFields {
    username: string;
    password: string;
    token: string;
    displayName: string;
    phoneNumber: string;
}
  
interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}
  
export type UserModel = Model<UserFields, unknown, UserMethods>;

export interface ItemMutation {
    title: string;
    description: string;
    image: string | null;
    category: string;
}