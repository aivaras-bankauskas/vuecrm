import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_ENV_BASE_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default {
    getAll(endpoint: string): Promise<void> {
        return apiClient.get(endpoint);
    },
    get(endpoint: string, id: number): Promise<void> {
        return apiClient.get(`${endpoint}/${id}`);
    },
    store(endpoint: string, item: object): Promise<void> {
        return apiClient.post(endpoint, item);
    },
    update(endpoint: string, id: number, item: object): Promise<void> {
        return apiClient.put(`${endpoint}/${id}`, item);
    },
    delete(endpoint: string, id: number): Promise<void> {
        return apiClient.delete(`${endpoint}/${id}`);
    },
};