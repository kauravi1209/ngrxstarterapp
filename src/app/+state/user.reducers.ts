import { UserPayloadType, UserState } from './user.slice';
import { UserResponse } from '../models/user.model';

export const userReducer = {
  initialize: (state: UserState): UserState => state,
  retrieveUsersData: (state: UserState): UserState => {
    return {
      ...state,
    };
  },
  retrieveUsersDataSuccess: (
    state: UserState,
    { payload }: UserPayloadType<{ users: UserResponse[] }>
  ): UserState => {
    return {
      ...state,
      users: payload.users,
    };
  },
  saveEdit: (
    state: UserState,
    { payload }: UserPayloadType<{ user: UserResponse }>
  ): UserState => {
    return {
      ...state,
    };
  },
  saveEditSuccess: (
    state: UserState,
    { payload }: UserPayloadType<{ user: UserResponse }>
  ): UserState => {
    return {
      ...state,
      users: state.users?.map((u) =>
        u.id === payload.user.id ? payload.user : u
      ),
    };
  },
};
