import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiConstants } from "@core/constants/api.constants";
import { Response } from '@core/response';
import { map } from "rxjs/operators";

export interface CampaignDetailDTO {
    id: number;
    campaignMode: string;
    title: string;
    shortDescription: string;
    description: string;
    imagePath: string;
    promoCode: string;
    startDate: string;
    endDate: string;
    totalIssued: number;
    usagePerCustomer: number;
    active: string;
    totalConsumed: number;
    status: string;
    spendingLimit: number;
    spentPercentage: number;
    spentAmount: number;
    redeemLimit: number;
    redeemCount: number;
    redeemPercentage: number;
    clicked: boolean;
}

export interface UserResponse {
    id : number;
    userName : string;
    mobileNumber : string;
    name : string;
    emailAddress : string;
    active : string;
}



export interface CampaignDetailListResponse {
    campaignDetails : CampaignDetailDTO[];
}

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(
        private http: HttpClient,
    ) { }

   
}