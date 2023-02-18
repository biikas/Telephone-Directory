import { Injectable } from '@angular/core';
import { TransactionStatus, TransactionStatuses } from './transaction-status';

@Injectable({
    providedIn: 'root'
})
export class TransactionStatusService {
    transactionStatus(status: string): TransactionStatus {
        return Object.values(TransactionStatuses).find((currentStatus: TransactionStatus) => currentStatus.status === status);
    }

    getStatus(status: string) {
        return this.transactionStatus(status);
    }
}