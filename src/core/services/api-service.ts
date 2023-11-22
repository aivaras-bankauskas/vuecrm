import axios, { AxiosResponse } from 'axios';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default {
    getAll(endpoint: string): Promise<AxiosResponse> {
        return apiClient.get(endpoint);
    },
    get(endpoint: string, id: number): Promise<AxiosResponse> {
        return apiClient.get(`${endpoint}/${id}`);
    },
    store(endpoint: string, data: object): Promise<AxiosResponse> {
        return apiClient.post(endpoint, data);
    },
    update(endpoint: string, id: number, data: object): Promise<AxiosResponse> {
        return apiClient.patch(`${endpoint}/${id}`, data);
    },
    delete(endpoint: string, id: number): Promise<AxiosResponse> {
        return apiClient.delete(`${endpoint}/${id}`);
    },
};
