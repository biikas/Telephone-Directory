export interface TransactionStatus {
    name: string;
    status: string;
    className: string;
}

export const REQUEST_STATUSES = [
    {
        name: 'All',
        status: ''
    },
    {
        name: 'Pending',
        status: 'PENDING'
    },
    {
        name: 'Success',
        status: 'SUCCESS'
    },
    {
        name: 'Failed',
        status: 'FAILED'
    },
    {
        name: 'Ambiguous',
        status: 'AMBIGUOUS'
    },
    {
        name: 'Timeout',
        status: 'TIMEOUT',
    }
];

export class TransactionStatuses {
    static readonly ACTIVE: TransactionStatus = {
        name: 'Active',
        status: 'ACTIVE',
        className: 'badge badge--info'
    };
    static readonly INACTIVE: TransactionStatus = {
        name: 'Inactive',
        status: 'INACTIVE',
        className: 'badge badge--delection'
    };
    static readonly AMBIGUOUS: TransactionStatus = {
        name: 'Ambiguous',
        status: 'AMBIGUOUS',
        className: 'badge badge--delection'
    };
    static readonly TIMEOUT: TransactionStatus = {
        name: 'Timeout',
        status: 'TIMEOUT',
        className: 'badge badge--variant-21'
    };
    static readonly SUCCESS: TransactionStatus = {
        name: 'Success',
        status: 'SUCCESS',
        className: 'badge badge--success'
    };
    static readonly FAILED: TransactionStatus = {
        name: 'Failed',
        status: 'FAILED',
        className: 'badge badge--error'
    };
    static readonly PEDNING: TransactionStatus = {
        name: 'Pending',
        status: 'PENDING',
        className: 'badge badge--info'
    };
    static readonly COMPLETE: TransactionStatus = {
        name: 'Completed',
        status: 'COMPLETED',
        className: 'badge badge--success'
    };
    static readonly REJECTED: TransactionStatus = {
        name: 'Rejected',
        status: 'REJECTED',
        className: 'badge badge--error'
    };
}