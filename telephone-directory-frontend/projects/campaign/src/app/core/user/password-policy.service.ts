import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '..';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiConstants } from '@core/constants/api.constants';

export interface PasswordPolicyResponse {
    passwordPolicy: string;
    minLength: number;
    maxLength: number;
}

@Injectable({
    providedIn: 'root'
})
export class PasswordPolicyService {
    constructor(
        private http: HttpClient,
    ) { }
    getPasswordPolicy(): Observable<PasswordPolicyResponse> {
        return this.http.get<Response<PasswordPolicyResponse>>(
            ApiConstants.generateWebPath(ApiConstants.PASSWORD, ApiConstants.POLICIES)
        ).pipe(map((response) => response.data));
    }
}
