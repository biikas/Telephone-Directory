import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '..';
import { map } from 'rxjs/operators';
import { ApiConstants } from '@core/constants/api.constants';
import { Observable } from 'rxjs';

export interface UserFilter {
    search: {
        key: string,
        value: any;
    }[];
    page: number;
    size: number;
}
export interface ModifyUserRequest {
    name: string;
    emailAddress: string;
    mobileNumber: string;
    active: string;
}

export interface UserDetail extends ModifyUserRequest {
    id: number;
    userName: string;
}

export interface UserListResponse {
    object: UserDetail[];
    totalCount: number;
}
export interface ChangeStatusRequest {
    active: string;
}

export interface UserLists {
    userList: UserDetail[];
}

export interface ResetPasswordRequest {
    userId: number;
    newPassword: string;
}
export interface CreateUserRequest extends ModifyUserRequest {
    userName: string;
    password: string;
}

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient
    ) { }

    getSearchUserList(param: UserFilter) {
        return this.http.post<Response<UserListResponse>>(ApiConstants.generateWebPath(
            ApiConstants.USERS, ApiConstants.SEARCH
        ), param).pipe(map((response) => response.data));
    }

    getUserList() {
        return this.http.get<Response<UserLists>>(ApiConstants.generateWebPath(
            ApiConstants.USERS, ApiConstants.LIST
        )).pipe(map((response) => response.data.userList));
    }

    getUserDetail(id: number) {
        return this.http.get<Response<UserDetail>>(ApiConstants.generateWebPath(
            ApiConstants.USERS, id.toString()
        )).pipe(map((response) => response.data));
    }

    resetPassword(request: ResetPasswordRequest) {
        return this.http.post<Response>(ApiConstants.generateWebPath(
            ApiConstants.USERS, ApiConstants.PASSWORD, ApiConstants.RESET
        ), request);
    }

    createUser(request: CreateUserRequest) {
        return this.http.post<Response>(ApiConstants.generateWebPath(
            ApiConstants.USERS
        ), request);
    }

    modifyUser(request: ModifyUserRequest, id: number): Observable<Response<UserDetail>> {
        return this.http.post<Response<UserDetail>>(ApiConstants.generateWebPath(
            ApiConstants.USERS, ApiConstants.MODIFY, id.toString()
        ), request).pipe(map((response) => response));
    }

    changeStatus(id: number, param: ChangeStatusRequest) {
        return this.http.post<Response<UserDetail>>(ApiConstants.generateWebPath(
            ApiConstants.USERS, ApiConstants.STATUS, id.toString()
        ), param).pipe(map((response) => response));
    }
}