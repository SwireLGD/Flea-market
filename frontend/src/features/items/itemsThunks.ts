import { createAsyncThunk } from "@reduxjs/toolkit";
import { Item, ItemDetails, ItemMutation } from "../../types";
import axiosApi from "../../axiosApi";
import axios from "axios";
import { RootState } from "../../app/store";

export const fetchItems = createAsyncThunk<Item[]>(
    'items/fetchItems',
    async () => {
        try {
            const response = await axiosApi.get<Item[]>('/items', {
                params: {
                    fields: 'image,title,price'
                }
            });
    
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                throw e.response.data;
            } else {
                throw new Error('Unable to fetch items');
            }
        }
    }
);

export const fetchItemDetails = createAsyncThunk<ItemDetails, string>(
    'items/fetchItemDetails',
    async (itemId: string, {rejectWithValue}) => {
        try {
            const response = await axiosApi.get<ItemDetails>(`/items/${itemId}`);
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            } else {
                return rejectWithValue('Something went wrong');
            }
        }
    }
);

export const createItem = createAsyncThunk<void, ItemMutation, {state: RootState}>(
    'items/createItem',
    async (itemMutation, { getState }) => {
        const token = getState().users.user?.token;

        const formData = new FormData();

        const keys = Object.keys(itemMutation) as (keyof ItemMutation)[];

        keys.forEach(key => {
            const value = itemMutation[key];

            if (value !== null) {
                if (typeof value === 'number') {
                    formData.append(key, value.toString());
                } else {
                    formData.append(key, value);
                }
            }
        });

        return axiosApi.post('/items', formData, {headers: {Authorization: `Bearer ${token}`} });
    }
);