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
        .map(async field => {
            const fieldErrors = field === 'confirmPassword' && formData.password
                ? await validationHandler(field, formData[field], validationErrors, formData.password)
                : await validationHandler(field, formData[field], validationErrors, undefined, config, formData);

            if (fieldErrors) {
                errors[field] = fieldErrors;
                if (field === 'password' && fieldErrors === 'mismatch') {
                    errors['email'] = 'mismatch';
                }
                return false;
            }
            return true;
        });
    const results = await Promise.all(validationPromises);
    return results.every(isFieldValid => isFieldValid);
};

const validationHandler = async (
    field: string,
    value: string,
    validationErrors: { [k: string]: string; },
    originalPassword?: string,
    config?: ConfigInterface,
    formData?: FormDataInterface
): Promise<string> => {
    const rules = validationErrors[field].split('|');
    let errorMessage: string = '';

    for (const rule of rules) {
        const [ruleName, ruleValue] = rule.split(':');
        const validationFunction = validationRules[ruleName];

        if (validationFunction) {
            if (ruleName === 'unique') {
                const data = await APIService.getAll(config?.API as string);
                const arrayToCheck = data.data.map((item: FormDataInterface) => item[field]);
                errorMessage = (validationFunction as ValidationFunctionArrayArg)(value, arrayToCheck);
            } else if (ruleName === 'mismatch') {
                const data = await APIService.getAll(config?.API as string);
                const matchingUser = data.data.find((item: FormDataInterface) => item.email === formData?.email);

                if (matchingUser) {
                    errorMessage = (validationFunction as ValidationFunctionMultiArg)(value, matchingUser.password);
                } else {
                    errorMessage = 'mismatch';
                }
            } else if (field === 'confirmPassword' && ruleName === 'confirmPassword') {
                errorMessage = (validationFunction as ValidationFunctionMultiArg)(value, originalPassword as string);
            } else {
                const param = ruleValue ? parseInt(ruleValue) : undefined;
                if (typeof param === 'number') {
                    errorMessage = (validationFunction as ValidationFunctionDoubleArg)(value, param);
                } else {
                    errorMessage = (validationFunction as ValidationFunctionSingleArg)(value);
                }
            }

            if (errorMessage) {
                break;
            }
        }
    }

    return errorMessage;
};

export default validateFormData;
