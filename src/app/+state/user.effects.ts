import { Injectable } from '@angular/core';
import { UserResponse } from '../models/user.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import * as userState from './user.slice';

@Injectable()
export class UserEffects {
  private readonly baseUrl = `https://jsonplaceholder.typicode.com/users`;

  constructor(private actions$: Actions, private http: HttpClient) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userState.actions.retrieveUsersData),
      switchMap(() =>
        this.http.get<UserResponse[]>(this.baseUrl).pipe(
          switchMap((users) => [
            userState.actions.retrieveUsersDataSuccess({ users: users }),
          ]),
          catchError((error: any) => {
            console.log(error);
            return throwError(() => error);
          })
        )
      )
    )
  );

  saveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userState.actions.saveEdit),
      switchMap((actions) =>
        this.http
          .put<UserResponse>(
            `${this.baseUrl}/${actions.payload.user.id}`,
            actions.payload.user
          )
          .pipe(
            switchMap((user) => [
              userState.actions.saveEditSuccess({ user: user }),
            ]),
            catchError((error: any) => {
              console.log(error);
              return throwError(() => error);
            })
          )
      )
    )
  );
}
