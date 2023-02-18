export interface  ProductStatus {
    name: string;
    status: string;
    className: string;
}

export class ProductStatuses {
    static readonly ACTIVE: ProductStatus = {
        name: 'ACTIVE',
        status: 'Y',
        className: 'badge badge--active'
    };
    static readonly INACTIVE: ProductStatus = {
        name: 'INACTIVE',
        status: 'N',
        className: 'badge badge--delection'
    };
}