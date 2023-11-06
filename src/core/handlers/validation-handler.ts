import validationRules, {
    ValidationFunctionSingleArg,
    ValidationFunctionDoubleArg,
    ValidationFunctionMultiArg,
    ValidationFunctionArrayArg
} from '@/core/validation/validation-rules';
import APIService from '@/core/services/api-service';
import ConfigInterface from '@/core/interfaces/ConfigInterface';

const validateFormData = async (
    formData: Record<string, string>,
    validationErrors: Record<string, string>,
    excludedFields: string[],
    errors: Record<string, string>,
    config: ConfigInterface
): Promise<boolean> => {
    let isValid = true;

    for (const field of Object.keys(formData)) {
        if (excludedFields.includes(field)) continue;

        let fieldErrors = '';

        if (field === 'confirmPassword' && formData.hasOwnProperty.call(formData, 'password')) {
            fieldErrors = await validationHandler(field, formData[field], validationErrors, formData['password']);
        } else {
            fieldErrors = await validationHandler(field, formData[field], validationErrors, undefined, config, formData);
        }

        if (fieldErrors) {
            isValid = false;
        }
        errors[field] = fieldErrors;

        if (fieldErrors === 'mismatch' && field === 'password') {
            errors['email'] = 'mismatch';
        }
    }

    return isValid;
};

const validationHandler = async (
    field: string,
    value: string,
    validationErrors: { [k: string]: string; },
    originalPassword?: string,
    config?: ConfigInterface,
    formData?: Record<string, string>
): Promise<string> => {
    const rules = validationErrors[field].split('|');
    let errorMessage: string = '';

    for (const rule of rules) {
        const [ruleName, ruleValue] = rule.split(':');
        const validationFunction = validationRules[ruleName];

        if (validationFunction) {
            if (ruleName === 'unique') {
                const data = await APIService.getAll(config?.API as string);
                const arrayToCheck = data.data.map((item: Record<string, string>) => item[field]);
                errorMessage = (validationFunction as ValidationFunctionArrayArg)(value, arrayToCheck);
            } else if (ruleName === 'mismatch') {
                const data = await APIService.getAll(config?.API as string);
                const matchingUser = data.data.find((item: Record<string, string>) => item.email === formData?.email);

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
