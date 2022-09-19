// import { useState } from "react";

// export const dataHolding = () => {
//   const [data, setData] = useState("");
//   const getData = (data: any) => {};
// };

class dataHolding {
  data: {};
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
