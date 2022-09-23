class dataHolding {
  data: Record<string, unknown>;
  constructor() {
    this.data = {};
  }

  getData(data: any) {
    this.data = data;
  }

  setData() {
    return this.data;
  }
}
export default new dataHolding();
