import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.nasa.gov/planetary/',
  timeout: 1000,
});

export const getPicture = (count: string = '') => instance.get(`apod?api_key=NydNz0ch6htEgSySS8pTEewmd8BZcRd4FOnl85rx&count=${count}`);
