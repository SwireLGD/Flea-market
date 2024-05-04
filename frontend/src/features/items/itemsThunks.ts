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
                formData.append(key, value);
            }
        });

        return axiosApi.post('/items', formData, {headers: {Authorization: `Bearer ${token}`} });
    }
);

export const deleteItem = createAsyncThunk<void, string, {state: RootState}>(
    'items/deleteItem',
    async (itemId, { getState, rejectWithValue }) => {
        const token = getState().users.user?.token;

        if (!token) {
            return rejectWithValue('Authentication required');
        }

        try {
            const response = await axiosApi.delete(`/items/${itemId}`, {
                headers: {Authorization: `Bearer ${token}` }
            });

            if (response.status !== 204) {
                return rejectWithValue('Failed to delete the item');
            }

            return;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response) {
                    if (e.response.status === 403) {
                        return rejectWithValue('Unauthorized to delete the item');
                    } else if (e.response.status === 404) {
                        return rejectWithValue('Item not found');
                    } else {
                        return rejectWithValue(e.response.data.message || 'server error during deletion');
                    }
                }
            }
            return rejectWithValue('Network error or unable to reach server');
        }
    }
);

export const fetchItemsByCategory = createAsyncThunk<Item[], string>(
    'items/fetchByCategory',
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(`/categories/${categoryId}/items`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);