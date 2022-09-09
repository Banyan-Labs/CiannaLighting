import axios, { AxiosResponse } from "axios";

const createHttpRequest = async <T>(
  url: string,
  body: T
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(url, body);
    return response;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export { createHttpRequest };
