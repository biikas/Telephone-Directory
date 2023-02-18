import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

export interface PageChangeEvent {
    page: number;
    pageSize: number;
}

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.html',
    host: {
        class: 'pagination'
    }
})

export class PaginationComponent implements OnInit, OnChanges {
    @Input() total: number;
    @Output() changePage = new EventEmitter<PageChangeEvent>();
    @Input() initialPage = 1;
    @Input() pageSize: number;
    @Input() maxPages: number;
    @Input()
    pageSizeOptions = [5, 10, 20, 50];
    @Input() showRecords = true;

    pager: {
        totalItems: number,
        currentPage: number,
        pageSize: number,
        totalPages: number,
        startPage: number,
        endPage: number,
        startIndex: number,
        endIndex: number,
        pages: number[]
    } = {
            totalItems: 0,
            currentPage: null,
            pageSize: null,
            totalPages: null,
            startPage: null,
            endPage: null,
            startIndex: null,
            endIndex: null,
            pages: null
        };

    get currentRecords() {
        let from = 0;
        let to = 0;
        if (this.pager.totalPages) {
            from = (this.pager.currentPage - 1) * this.pager.pageSize + 1,
                to = (from - 1) + this.pager.pageSize;
        }
        if (to > this.pager.totalItems) {
            to = this.pager.totalItems;
        }
        return {
            from,
            to
        };
    }

    ngOnInit() {
        // set page if items array isn't empty
        if (this.total) {
            this.setPage(this.initialPage, false);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.total) {
            if (changes.total.currentValue !== changes.total.previousValue) {
                this.setPage(this.initialPage, false);
            }
        } else if (changes.pageSize) {
            if (changes.pageSize.currentValue !== changes.pageSize.previousValue) {
                this.setPage(this.initialPage, false);
            }
        }
    }

    setPage(page: number, emitEvent = true) {
        // get new pager object for specified page
        this.pager = this.paginate(this.total, page, this.pageSize, this.maxPages);

        // call change page function in parent component
        if (emitEvent) {
            this.changePage.emit({ page: this.pager.currentPage, pageSize: this.pager.pageSize });
        }
    }

    itemChange(event: number) {
        this.pageSize = event;
        this.setPage(this.initialPage);
    }

    pageChange(event: number) {
        this.pager.currentPage = event;
        this.setPage(this.pager.currentPage);
    }

    private paginate(
        totalItems: number,
        currentPage: number = 1,
        pageSize: number = 10,
        maxPages: number = 3
    ) {
        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number;
        let endPage: number;
        if (totalPages <= maxPages) {
            // total pages less than max so show all pages
            startPage = 1;
            endPage = totalPages;
        } else {
            // total pages more than max so calculate start and end pages
            const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
            const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                // current page near the start
                startPage = 1;
                endPage = maxPages;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                // current page near the end
                startPage = totalPages - maxPages + 1;
                endPage = totalPages;
            } else {
                // current page somewhere in the middle
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        const pages = Array.from(Array((endPage + 1) - startPage).keys()).map((i) => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }

}