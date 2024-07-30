import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from '../models/user.model';
import { userReducer } from './user.reducers';

export type UserPayloadType<T extends Record<string, unknown>> =
  PayloadAction<T>;

export interface UserState {
  users: UserResponse[];
}

export interface State {
  users: UserState;
}

export const initialState: UserState = {
  users: [],
};

export const slice = createSlice({
  initialState: initialState,
  name: 'users',
  reducers: userReducer,
});

export const { actions, reducer } = slice;
