import validationRules, {
    ValidationFunctionSingleArg,
    ValidationFunctionDoubleArg,
    ValidationFunctionMultiArg,
    ValidationFunctionArrayArg
} from '@/core/validation/validation-rules';
import APIService from '@/core/services/api-service';
import ConfigInterface from '@/core/interfaces/ConfigInterface';
import FormDataInterface from '@/core/interfaces/FormDataInterface';

const validateFormData = async (
    formData: FormDataInterface,
    validationErrors: FormDataInterface,
    excludedFields: string[],
    errors: FormDataInterface,
    config: ConfigInterface
): Promise<boolean> => {
    const validationPromises = Object.keys(formData)
        .filter(field => !excludedFields.includes(field))
        .map(field => {
            if (field === 'confirmPassword' && formData.password) {
                return validationHandler(field, formData[field], validationErrors, formData.password, config, formData);
            } else {
                return validationHandler(field, formData[field], validationErrors, undefined, config, formData);
            }
        });

    const validationResults = await Promise.all(validationPromises);

    Object.keys(formData).forEach((field, index) => {
        if (!excludedFields.includes(field)) {
            const fieldErrors = validationResults[index];
            if (fieldErrors) {
                errors[field] = fieldErrors;
                if (field === 'password' && fieldErrors === 'mismatch') {
                    errors['email'] = 'mismatch';
                }
            } else {
                errors[field] = '';
            }
        }
    });

    return !Object.values(errors).some(error => error !== '');
};

const validationHandler = async (
    field: string,
    value: string,
    validationErrors: { [k: string]: string; },
    originalPassword?: string,
    config?: ConfigInterface,
    formData?: FormDataInterface,
    externalData?: FormDataInterface[]
): Promise<string> => {
    const rules = validationErrors[field].split('|');
    let errorMessage: string = '';
    let data = externalData;

    for (const rule of rules) {
        const [ruleName, ruleValue] = rule.split(':');
        const validationFunction = validationRules[ruleName];

        if (validationFunction) {
            if ((ruleName === 'unique' || ruleName === 'mismatch') && !data) {
                const response = await APIService.getAll(config?.API as string);
                data = response.data;
            }

            switch (ruleName) {
                case 'unique': {
                    const arrayToCheck = data ? data.map((item: FormDataInterface) => item[field]) : [];
                    errorMessage = (validationFunction as ValidationFunctionArrayArg)(value, arrayToCheck);
                    break;
                }
                case 'mismatch': {
                    const matchingUser =  data ? data.find((item: FormDataInterface) => item.email === formData?.email): undefined;
                    errorMessage = matchingUser
                        ? (validationFunction as ValidationFunctionMultiArg)(value, matchingUser.password)
                        : 'mismatch';
                    break;
                }
                case 'confirmPassword': {
                    if (field === 'confirmPassword') {
                        errorMessage = (validationFunction as ValidationFunctionMultiArg)(value, originalPassword as string);
                    }
                    break;
                }
                default: {
                    const param = ruleValue ? parseInt(ruleValue, 10) : undefined;
                    errorMessage = param !== undefined
                        ? (validationFunction as ValidationFunctionDoubleArg)(value, param)
                        : (validationFunction as ValidationFunctionSingleArg)(value);
                    break;
                }
            }

            if (errorMessage) {
                return errorMessage;
            }
        }
    }
    return errorMessage;
};

export default validateFormData;
