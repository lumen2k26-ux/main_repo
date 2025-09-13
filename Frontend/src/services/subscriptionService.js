import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:4000/api/subscriptions" });

export const getSubs = async (userId) => (await API.get(`/?userId=${userId}`)).data;
export const subscribe = async (userId, planId) => (await API.post("/", { userId, planId })).data;
export const cancelSub = async (id) => (await API.post(`/${id}/cancel`)).data;
export const renewSub = async (id) => (await API.post(`/${id}/renew`)).data;
export const changePlan = async (id, newPlanId) => (await API.post(`/${id}/change`, { newPlanId })).data;