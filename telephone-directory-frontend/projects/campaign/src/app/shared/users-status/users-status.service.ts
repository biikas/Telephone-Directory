import { Injectable } from '@angular/core';
import { UsersStatuses, UserStatus } from './users-status';

@Injectable({
    providedIn: 'root'
})
export class UsersStatusService {
    userStatus(status: string): UserStatus {
        return Object.values(UsersStatuses).find((currentStatus: UserStatus) => currentStatus.status === status);
    }

    getStatus(status: string) {
        return this.userStatus(status);
    }
}