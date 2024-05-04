export interface RegisterMutation {
    username: string;
    password: string;
    displayName: string;
    phoneNumber: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    displayName: string;
    phoneNumber: string;
    token: string;
}

export interface RegisterResponse {
    user: User;
    massage: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface Item {
    _id: string;
    image: string | null;
    title: string;
    price: number;
}

export interface ItemDetails {
    _id: string; 
    title: string;
    description: string;
    price: number;
    image: string | null;
    category: string;
    seller: string
}

export interface ItemMutation {
    title: string;
    description: string;
    price: number;
    image: string | null;
    category: string;
    seller: string
}