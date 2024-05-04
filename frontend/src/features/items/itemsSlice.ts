import { createSlice } from "@reduxjs/toolkit";
import { Item, ItemDetails } from "../../types";
import { createItem, fetchItemDetails, fetchItems } from "./itemsThunks";
import { RootState } from "../../app/store";

interface ItemsState {
    items: Item[];
    currentItem: ItemDetails | null;
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: ItemsState = {
    items: [],
    currentItem: null,
    fetchLoading: false,
    createLoading: false
};

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchItems.fulfilled, (state, {payload: items}) => {
            state.fetchLoading = false;
            state.items = items;
        });
        builder.addCase(fetchItems.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(fetchItemDetails.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchItemDetails.fulfilled, (state, {payload: currentItem}) => {
            state.fetchLoading = true;
            state.currentItem = currentItem;
        });
        builder.addCase(fetchItemDetails.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createItem.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createItem.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createItem.rejected, (state) => {
            state.createLoading = false;
        });
    },
});

export const itemsReducer = itemsSlice.reducer;

export const selectItems = (state: RootState) => state.items.items;
export const selectCurrentItem = (state: RootState) => state.items.currentItem;
export const selectFetchLoading = (state: RootState) => state.items.fetchLoading;