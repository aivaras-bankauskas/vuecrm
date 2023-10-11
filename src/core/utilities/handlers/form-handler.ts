import APIService from '@/core/services/api-service';
import validationHandler from '@/core/utilities/validation/validation-hendler';
import ConfigInterface from '@/interfaces/ConfigInterface';

export const getFormData = async (
    urlId: number | null,
    formData: Record<string, unknown>,
    config: ConfigInterface
): Promise<Record<string, unknown>> => {
    if (urlId) {
        const existingData = await APIService.get(config.API, urlId);
        Object.assign(formData, existingData.data);
        return { ...existingData.data };
    }
    return {};
};

export const submitFormData = async (
    urlId: number | null,
    formData: Record<string, unknown>,
    initialFormData: Record<string, unknown>,
    validationErrors: Record<string, unknown>,
    config: ConfigInterface,
    data: Record<string, unknown>
): Promise<void> => {
    const formElement = document.querySelector('form');
    const [isValid, errors] = validationHandler.validateFormData(formElement);

    for (const key of Object.keys(validationErrors)) {
        validationErrors[key] = '';
    }

    const initialFormDataStr = JSON.stringify(initialFormData);
    const currentFormDataStr = JSON.stringify(formData);
    const hasChanged = initialFormDataStr !== currentFormDataStr;

    if (isValid) {
        if (!urlId) {
            await APIService.store(config.API, formData);
            Object.assign(formData, data);
        } else if (hasChanged) {
            await APIService.update(config.API, urlId, formData);
            Object.assign(initialFormData, formData);
        }
    } else {
        Object.assign(validationErrors, errors);
    }
};



