import axios from "axios";

export const authClient = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});
