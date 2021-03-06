import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchInitialInventory,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    uploadImage,
    deleteImages
} from './inventoryAPI';

const initialState = {
    inventory: [],
    loading: true,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    uploadImageLoading: false,
    uploadThumbnailLoading: false,
    newImageURL: null,
    newThumbnailURL: null
};

const formatResponse = (response) => {
    let formattedResponse = [];
    response.forEach((item) => {formattedResponse.push({...item, open: false})});
    return formattedResponse;
};

export const fetchInitialInventoryAsync = createAsyncThunk(
    'inventory/fetchInventory',
    async () => {
        const response = await fetchInitialInventory();
        return formatResponse(response.data);
    }
);

export const createInventoryItemAsync = createAsyncThunk(
    'inventory/createInventoryItem',
    async (newItem) => {
        const response = await createInventoryItem(newItem);
        var formattedResponse = response.data.newDocument;
        formattedResponse.open = false;
        return formattedResponse;
    }
);

export const updateInventoryItemAsync = createAsyncThunk(
    'inventory/updateInventoryItem',
    async (updatedItem) => {
        const response = await updateInventoryItem(updatedItem);
        var formattedResponse = response.data.newDocument;
        formattedResponse.open = false;
        return formattedResponse;
    }
);

export const deleteInventoryItemAsync = createAsyncThunk(
    'inventory/deleteInventoryItem',
    async (id) => {
        const response = await deleteInventoryItem(id);
        return response.data._id;
    }
);

export const deleteImagesAsync = createAsyncThunk(
    'inventory/deleteImages',
    async (URLs) => {
        const response = await deleteImages(URLs);
        return response.data;
    }
);

export const uploadImageAsync = createAsyncThunk(
    'inventory/uploadImage',
    async (file) => {
        const response = await uploadImage(file);
        return response.data.URL;
    }
);

export const uploadThumbnailAsync = createAsyncThunk(
    'inventory/uploadThumbnail',
    async (file) => {
        const response = await uploadImage(file);
        return response.data.URL;
    }
);

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        setModalOpen: (state, action) => {
            state.inventory[action.payload.index].open = action.payload.isOpen
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInitialInventoryAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchInitialInventoryAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.inventory = action.payload;
            })
            .addCase(createInventoryItemAsync.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createInventoryItemAsync.fulfilled, (state, action) => {
                state.createLoading = false;
                state.inventory = [action.payload, ...state.inventory];
            })
            .addCase(updateInventoryItemAsync.pending, (state) => {
                state.updateLoading = true;
            })
            .addCase(updateInventoryItemAsync.fulfilled, (state, action) => {
                let updateIndex = state.inventory.findIndex(
                    (item) => item._id === action.payload._id
                );
                state.inventory[updateIndex] = action.payload;
                state.updateLoading = false;
            })
            .addCase(deleteInventoryItemAsync.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteInventoryItemAsync.fulfilled, (state, action) => {
                let deleteIndex = state.inventory.findIndex(
                    (item) => item._id === action.payload
                );
                state.inventory = [
                    ...state.inventory.slice(0, deleteIndex),
                    ...state.inventory.slice(deleteIndex + 1)
                ];
                state.deleteLoading = false;
            })
            .addCase(uploadImageAsync.pending, (state) => {
                state.uploadImageLoading = true;
            })
            .addCase(uploadImageAsync.fulfilled, (state, action) => {
                state.uploadImageLoading = false;
                state.newImageURL = action.payload;
            })
            .addCase(uploadThumbnailAsync.pending, (state) => {
                state.uploadThumbnailLoading = true;
            })
            .addCase(uploadThumbnailAsync.fulfilled, (state, action) => {
                state.uploadThumbnailLoading = false;
                state.newThumbnailURL = action.payload;
            });
    }
});

export const { setModalOpen } = inventorySlice.actions;

export const selectInventory = (state) => state.inventory.inventory;

export default inventorySlice.reducer;
