export class Paginate {
    paginatedData: any[][] = [];
    data: any[] = [];

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
}