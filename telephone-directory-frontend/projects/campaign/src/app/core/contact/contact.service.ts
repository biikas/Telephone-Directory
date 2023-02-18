import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@core/response';
import { map } from 'rxjs/operators';
import { ApiConstants } from '@core/constants/api.constants';

export interface ContactCreateRequest {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email:string;
    dateOfBirth:string;
}

export interface ContactModifyRequest {
    id:number;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email:string;
    dateOfBirth:string;
}

export interface ContactDetailResponse {
    id:number;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email:string;
    dateOfBirth:string;
}

export interface ContactResponse {
    id: number;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    dateOfBirth:string;
}

export interface ContactListResponse {
    contactList: ContactResponse[]
}

export interface ContactSearchRequest {
    keyword:string;
}

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    constructor(
        private http: HttpClient
    ) { }

    createContact(request: ContactCreateRequest) {
        return this.http.post<Response>(ApiConstants.generateWebPath(
            ApiConstants.CREATE_CONTACT
        ), request);
    }
    searchContact(request:ContactSearchRequest){
        return this.http.post<Response<ContactListResponse>>(ApiConstants.generateWebPath(
            ApiConstants.CONTACT,ApiConstants.SEARCH
        ),request).pipe(map((response) => response.data.contactList));
    }

    modifyContact(request:ContactModifyRequest){
        return this.http.post<Response>(ApiConstants.generateWebPath(
            ApiConstants.MODIFY_CONTACT
        ),request)
    }

    getAllContacts() {
        return this.http.get<Response<ContactListResponse>>(ApiConstants.generateWebPath(
            ApiConstants.CONTACT_LIST)).pipe(map((response) => response.data.contactList));
    }

    getContactDetail(id: number) {
        return this.http.get<Response<ContactResponse>>(
            ApiConstants.generateWebPath(
                ApiConstants.CONTACT,
                id.toString()))
            .pipe(map((response) => response.data));
    }

    // searchContact(contactSearchRequest: string) {
    //     return this.http.post<Response<ContactListResponse>>(
    //         ApiConstants.generateWebPath(
    //             ApiConstants.CONTACT,
    //             ApiConstants.SEARCH))
    //         .pipe(map((response) => response.data.contactList),contactSearchRequest);
    // }

    deleteContact(id: number) {
        return this.http.get<Response>(
            ApiConstants.generateWebPath(
                ApiConstants.CONTACT,
                ApiConstants.DELETE,
                id.toString()))
            .pipe(map((response) => response));

    }
}