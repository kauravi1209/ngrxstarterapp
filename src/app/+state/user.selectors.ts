import { slice, UserState } from './user.slice';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<UserState>(slice.name);

export const selectUsers = createSelector(
  selectUserState,
  (users) => users.users
);
