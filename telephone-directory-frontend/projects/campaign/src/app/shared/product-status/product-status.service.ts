import { Injectable } from '@angular/core';
import { ProductStatus, ProductStatuses } from './product-status';

@Injectable({
    providedIn: 'root'
})
export class ProductStatusService {
    productStatus(status: string): ProductStatus {
        return Object.values(ProductStatuses).find((currentStatus: ProductStatus) => currentStatus.status === status);
    }

    getStatus(status: string) {
        return this.productStatus(status);
    }
}