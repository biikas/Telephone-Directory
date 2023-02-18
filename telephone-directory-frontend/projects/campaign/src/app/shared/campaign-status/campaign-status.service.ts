import { Injectable } from '@angular/core';
import { CampaignStatus, CampaignStatuses } from './campaign-status';

@Injectable({
    providedIn: 'root'
})
export class CampaignStatusService {
    campaignStatus(status: string): CampaignStatus {
        return Object.values(CampaignStatuses).find((currentStatus: CampaignStatus) => currentStatus.status === status);
    }

    getStatus(status: string) {
        return this.campaignStatus(status);
    }
}