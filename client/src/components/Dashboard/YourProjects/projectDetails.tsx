class dataHolding {
    data: Record<string, unknown>;
    constructor() {
        this.data = {};
    }

    getData(data: any) {
        this.data = data;
    }

    setData() {
        const details = {
            data: this.data,
        };
        return details;
    }
}
export default new dataHolding();
