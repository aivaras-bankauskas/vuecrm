import axios, { AxiosResponse } from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_ENV_BASE_URL,
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
        return apiClient.put(`${endpoint}/${id}`, data);
    },
    delete(endpoint: string, id: number): Promise<AxiosResponse> {
        return apiClient.delete(`${endpoint}/${id}`);
    },
};
