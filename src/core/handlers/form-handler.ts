import APIService from '@/core/services/api-service';
import validateFormData from '@/core/handlers/validation-handler';
import ConfigInterface from '@/core/interfaces/ConfigInterface';
import AuthService from '../services/auth-service';

export const getFormData = async (
    id: number,
    endpoint: string,
    formData: Record<string, string>,
    initialFormData: Record<string, string>
): Promise<void> => {
    const response = await APIService.get(endpoint, id);
    Object.assign(formData, response.data);
    Object.assign(initialFormData, response.data);
};

export const submitFormData = async (
    id: number,
    formData: Record<string, string>,
    initialFormData: Record<string, string>,
    validationErrors: Record<string, string>,
    config: ConfigInterface,
    errors: Record<string, string>
): Promise<boolean> => {
    const excludedFields = id ? ['id'] : [];

    const isValid = validateFormData(formData, validationErrors, excludedFields, errors);

    if (!isValid) return false;

    if (!id) {
        const response = await APIService.store(config.API, formData);

        if (config.name === 'signup' && typeof response.data.id === 'number') {
            AuthService.signup(response.data.id, '10s');
        }

        resetForm(formData);
        return true;
    }

    if (JSON.stringify(initialFormData) !== JSON.stringify(formData)) {
        await APIService.update(config.API, id, formData);
        getFormData(id, config.API, formData, initialFormData);
        return true;
    }
    return true;
};

const resetForm = (formData: Record<string, string>): void => {
    for (const field in formData) {
        formData[field] = '';
    }
};
