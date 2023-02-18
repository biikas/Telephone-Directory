export interface  CampaignStatus {
    name: string;
    status: string;
    className: string;
}

export const CAMPAIGN_STATUSES =  [
    {
        name: 'All',
        status: ''
    },
    {
        name: 'Active',
        status: 'ACTIVE'
    },
    {
        name: 'Completed',
        status: 'COMPLETED'
    },
    {
        name: 'Cancelled',
        status: 'CANCELLED'
    },
    {
        name: 'Paused',
        status: 'PAUSED',
    }
];

export class CampaignStatuses {
    static readonly ACTIVE: CampaignStatus = {
        name: 'Active',
        status: 'ACTIVE',
        className: 'badge badge--info'
    };
    static readonly COMPLETED: CampaignStatus = {
        name: 'Completed',
        status: 'COMPLETED',
        className: 'badge badge--success'
    };
    static readonly CANCELLED: CampaignStatus = {
        name: 'Cancelled',
        status: 'CANCELLED',
        className: 'badge badge--error'
    };
    static readonly PAUSED: CampaignStatus = {
        name: 'Paused',
        status: 'PAUSED',
        className: 'badge badge--warning'
    };
}