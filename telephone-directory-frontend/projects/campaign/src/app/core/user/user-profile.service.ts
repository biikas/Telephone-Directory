import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '..';
import { map } from 'rxjs/operators';
import { ApiConstants } from '@core/constants/api.constants';

export interface ChangePasswordRequest {
    newPassword: string;
    oldPassword: string;
}

export interface DetailResponse {
    userName: string;
    mobileNumber: string;
    name: string;
    emailAddress: string;
}

@Injectable()
export class UserProfileService {
    constructor(
        private http: HttpClient
    ) { }

    changePassword(request: ChangePasswordRequest) {
        return this.http.post<Response>(ApiConstants.generateWebPath(
            ApiConstants.PASSWORD, ApiConstants.CHANGE
        ), request);
    }

    getProfileDetail() {
        return this.http.get<Response<DetailResponse>>(ApiConstants.generateWebPath(
            ApiConstants.USERS, ApiConstants.TOKEN
        )).pipe(map((response) => response.data));
    }

}