import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveToLocalStorage, loadFromLocalStorage } from '../../utils/localStorage';
import { generateInvoice } from './invoiceAPI';

export const fetchInvoice = createAsyncThunk(
  'invoice/fetchInvoice',
  async (invoiceData, { rejectWithValue }) => {
    try {
      const response = await generateInvoice(invoiceData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: loadFromLocalStorage('invoice') || {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearInvoice: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
      saveToLocalStorage('invoice', state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoice.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchInvoice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        saveToLocalStorage('invoice', state);
      })
      .addCase(fetchInvoice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const { clearInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;