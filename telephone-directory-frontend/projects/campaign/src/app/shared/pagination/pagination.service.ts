import { Injectable } from '@angular/core';
import { Paginate } from './paginate';
/**
 * Deprecated - use `PaginationConnector` instead
 */
@Injectable({
    providedIn: 'root'
})
export class PaginationService {
    paginatedData: any[][] = [];
    data: any[] = [];
    /**
     * Deprecated
     *
     */
    paginate(page: number) {
        return this.paginatedData[page - 1] || [];
    }

    initialize(data: any[], size: number) {

        this.data = data;
        this.paginatedData = data.reduce((paginatedData, item, index) => {
            const page = Math.floor(index / size);
            if (!paginatedData[page]) {
                paginatedData[page] = [];
            }
            paginatedData[page].push(item);
            return paginatedData;
        }, []);
        return this.paginate(1);
    }

    changeSize(size: number) {
        return this.initialize(this.data, size);
    }

    get pagination() {
        return new Paginate();
    }
}