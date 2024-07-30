import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../models/user.model';
import { UserFacadeService } from '../services/user-facade.service';
import { FormsModule } from '@angular/forms';
import { SubSink } from 'subsink';
import { CommonModule } from '@angular/common';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private readonly sub: SubSink = new SubSink();
  users: UserResponse[] = [];
  editingUserId: number | null;

  constructor(private userFacadeService: UserFacadeService) {
    this.editingUserId = null;
  }

  ngOnInit(): void {
    this.requestForUsersData();
    this.initializeUsers();
  }

  requestForUsersData(): void {
    this.userFacadeService.setUsers();
  }

  initializeUsers(): void {
    this.sub.sink = this.userFacadeService.users$.subscribe({
      next: (users: UserResponse[]) => {
        console.log(users);
        this.users = cloneDeep(users);
      },
    });
  }

  editUserInfo(userInfo: UserResponse): void {
    this.editingUserId = userInfo.id;
  }

  saveUserInfo(userInfo: UserResponse): void {
    this.userFacadeService.saveUser(userInfo);
    this.editingUserId = null;
  }
}
