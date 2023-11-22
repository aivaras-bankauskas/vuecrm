import { AxiosResponse } from 'axios';
import APIService from '@/core/services/api-service';
import validationHandler from '@/core/handlers/validation-handler';
import ConfigInterface from '@/core/interfaces/ConfigInterface';
import FormDataInterface from '@/core/interfaces/FormDataInterface';
import AuthService from '@/core/services/auth-service';

export const getFormData = async (
    id: number,
    endpoint: string,
    formData: FormDataInterface,
    initialFormData: FormDataInterface
): Promise<void> => {
    const response = await APIService.get(endpoint, id);
    Object.assign(formData, response.data);
    Object.assign(initialFormData, response.data);
};

export const submitFormData = async (
    id: number,
    formData: FormDataInterface,
    initialFormData: FormDataInterface,
    validationErrors: FormDataInterface,
    config: ConfigInterface,
    errors: FormDataInterface
): Promise<boolean> => {
    const excludedFields = id ? ['id'] : [];

    if (!(await validationHandler(formData, validationErrors, excludedFields, errors, config))) {
        return false;
    };

    switch (config.name) {
        case 'signIn':
            return handleSignIn(formData, config);
        case 'signup':
            return handleSignup(formData, config);
        default:
            return id
                ? updateForm(id, formData, initialFormData, config)
                : submitForm(formData, config);
    }
};

const submitForm = async (formData: FormDataInterface, config: ConfigInterface): Promise<boolean> => {
    await APIService.store(config.API, formData);
    resetForm(formData);
    return true;
};

const updateForm = async (id: number, formData: FormDataInterface, initialFormData: FormDataInterface, config: ConfigInterface): Promise<boolean> => {
    if (JSON.stringify(initialFormData) !== JSON.stringify(formData)) {
        await APIService.update(config.API, id, formData);
        resetForm(formData);
    };
    return true;
};

const handleSignup = async (formData: FormDataInterface, config: ConfigInterface): Promise<boolean> => {
    const formDataCopy = { ...formData };
    delete formDataCopy.confirmPassword;
    const response = await APIService.store(config.API, formDataCopy);
    return handleAuthentication(formData, response);
};

const handleSignIn = async (formData: FormDataInterface, config: ConfigInterface): Promise<boolean> => {
    const response = await APIService.store(config.API, formData);
    return handleAuthentication(formData, response);
};

const handleAuthentication = (formData: FormDataInterface, response: AxiosResponse): boolean => {
    if (response.data.data) {
        AuthService.signIn(response.data.token);
        resetForm(formData);
        return true;
    }
    return false;
};

const resetForm = (formData: FormDataInterface): void => {
    for (const field in formData) {
        formData[field] = '';
    }
};
