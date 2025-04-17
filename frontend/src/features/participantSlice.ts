// src/store/slices/participantSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getProblemStatements, registerTeam } from "../api/handlers";
import { Problem, ReqParticipantRegistration } from "../api/bodies/participant"; // adjust based on your model

interface ParticipantState {
  problems: Problem[];
  loading: boolean;
  error: string | null;
}

const initialState: ParticipantState = {
  problems: [],
  loading: false,
  error: null,
};

// Async thunk to fetch problems
export const fetchProblemsThunk = createAsyncThunk(
  "participant/fetchProblems",
  async (_, thunkAPI) => {
    try {
      const data = await getProblemStatements();
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Failed to load problems");
    }
  }
);

// Async thunk to register team
export const registerParticipant = createAsyncThunk(
  "participant/register",
  async (formData: ReqParticipantRegistration, thunkAPI) => {
    try {
      const response = await registerTeam(formData);
      if (typeof response === "string") {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Failed to register.");
    }
  }
);

const participantSlice = createSlice({
  name: "participant",
  initialState,
  reducers: {
    // other reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProblemsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProblemsThunk.fulfilled,
        (state, action: PayloadAction<Problem[]>) => {
          state.loading = false;
          state.problems = action.payload;
        }
      )
      .addCase(fetchProblemsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default participantSlice.reducer;
