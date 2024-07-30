import { EnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import { userReducer } from '../+state/user.reducers';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from '../+state/user.effects';
import * as userState from '../+state/user.slice';

export const provideUserServices = (): EnvironmentProviders[] => {
  return [
    provideState(userState.slice.name, userState.reducer),
    provideEffects([UserEffects]),
  ];
};
