import APIService from '@/core/services/api-service';
import validateFormData from '@/core/handlers/validation-handler';
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
    if (!(await validateForm(id, formData, validationErrors, errors, config))) {
        return false;
    }
    return config.name === 'signIn'
        ? handleSignIn(formData)
        : await handleForm(id, formData, initialFormData, config);
};

const validateForm = async (
    id: number,
    formData: FormDataInterface,
    validationErrors: FormDataInterface,
    errors: FormDataInterface,
    config: ConfigInterface
): Promise<boolean> => {
    const excludedFields = id ? ['id'] : [];
    return await validateFormData(formData, validationErrors, excludedFields, errors, config);
};

const handleSignIn = async (formData: FormDataInterface): Promise<boolean> => {
    const { email, password } = formData;
    if (await AuthService.signIn(email, password)) {
        resetForm(formData);
        return true;
    }
    return false;
};

const handleForm = async (
    id: number,
    formData: FormDataInterface,
    initialFormData: FormDataInterface,
    config: ConfigInterface
): Promise<boolean> => {
    const formDataCopy = { ...formData };
    if (config.name === 'signup') {
        delete formDataCopy.confirmPassword;
    }

    if (!id) {
        return await handleNewForm(formDataCopy, config);
    }

    if (JSON.stringify(initialFormData) !== JSON.stringify(formData)) {
        await APIService.update(config.API, id, formDataCopy);
        await getFormData(id, config.API, formData, initialFormData);
    }
    return true;
};

const handleNewForm = async (formData: FormDataInterface, config: ConfigInterface): Promise<boolean> => {
    const response = await APIService.store(config.API, formData);
    if (config.name === 'signup' && typeof response.data.id === 'number') {
        AuthService.signup(response.data.id);
    }
    resetForm(formData);
    return true;
};

const resetForm = (formData: FormDataInterface): void => {
    Object.keys(formData).forEach(field => {
        formData[field] = '';
    });
};
