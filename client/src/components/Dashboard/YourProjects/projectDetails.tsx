class dataHolding {
    data: Record<string, unknown>;
    color: Record<string, unknown>;
    constructor() {
        this.data = {};
        this.color = {};
    }

    getData(data: any, color: any) {
        this.data = data;
        this.color = color;
    }

    setData() {
        const details = {
            data: this.data,
            color: this.color,
        };
        return details;
    }
}
export default new dataHolding();
