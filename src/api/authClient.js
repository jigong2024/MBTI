import axios from "axios";

export const authClient = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});

export const resultClient = axios.create({
  baseURL: "http://localhost:5000/testResults",
});
