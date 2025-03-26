/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Registration } from "../components/admin/RegistrationList";
import { getReg, verifyReg, rejectReg, deleteReg } from "../api/handlers";

interface AdminState {
  admin: { username: string } | null;
  registrations: Registration[];
  loading: boolean;
  verifyLoading: boolean;
  rejectLoading: boolean;
  deleteLoading: boolean;
}

const initialState: AdminState = {
  admin: null,
  registrations: [],
  loading: false,
  verifyLoading: false,
  rejectLoading: false,
  deleteLoading: false,
};

// Thunk for fetching registrations
export const fetchRegistrations = createAsyncThunk(
  "admin/fetchRegistrations",
  async (_) => {
    const regs = await getReg();
    return regs;
  }
);

// Thunk for verifying a registration
export const verifyRegistrationThunk = createAsyncThunk(
  "admin/verifyRegistration",
  async (regID: string, thunkAPI) => {
    const success = await verifyReg(regID);
    if (success) {
      return regID;
    } else {
      return thunkAPI.rejectWithValue("Verification failed");
    }
  }
);

// Thunk for rejecting a registration
export const rejectRegistrationThunk = createAsyncThunk(
  "admin/rejectRegistration",
  async (regID: string, thunkAPI) => {
    const success = await rejectReg(regID);
    if (success) {
      return regID;
    } else {
      return thunkAPI.rejectWithValue("Rejection failed");
    }
  }
);

// Thunk for deleting a registration
export const deleteRegistrationThunk = createAsyncThunk(
  "admin/deleteRegistration",
  async (regID: string, thunkAPI) => {
    const success = await deleteReg(regID);
    if (success) {
      return regID;
    } else {
      return thunkAPI.rejectWithValue("Deletion failed");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<{ username: string }>) {
      state.admin = action.payload;
    },
    clearAdmin(state) {
      state.admin = null;
      state.registrations = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch registrations
    builder.addCase(fetchRegistrations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchRegistrations.fulfilled,
      (state, action: PayloadAction<Registration[]>) => {
        state.loading = false;
        state.registrations = action.payload;
      }
    );
    builder.addCase(fetchRegistrations.rejected, (state) => {
      state.loading = false;
    });

    // Verify registration
    builder.addCase(verifyRegistrationThunk.pending, (state) => {
      state.verifyLoading = true;
    });
    builder.addCase(
      verifyRegistrationThunk.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.verifyLoading = false;
        const regID = action.payload;
        state.registrations = state.registrations.map((reg) =>
          reg.regID === regID ? { ...reg, verified: true } : reg
        );
      }
    );
    builder.addCase(verifyRegistrationThunk.rejected, (state) => {
      state.verifyLoading = false;
    });

    // Reject registration
    builder.addCase(rejectRegistrationThunk.pending, (state) => {
      state.rejectLoading = true;
    });
    builder.addCase(
      rejectRegistrationThunk.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.rejectLoading = false;
        const regID = action.payload;
        state.registrations = state.registrations.map((reg) =>
          reg.regID === regID ? { ...reg, rejected: true } : reg
        );
      }
    );
    builder.addCase(rejectRegistrationThunk.rejected, (state) => {
      state.rejectLoading = false;
    });

    // Delete registration
    builder.addCase(deleteRegistrationThunk.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(
      deleteRegistrationThunk.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.deleteLoading = false;
        const regID = action.payload;
        state.registrations = state.registrations.filter(
          (reg) => reg.regID !== regID
        );
      }
    );
    builder.addCase(deleteRegistrationThunk.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
