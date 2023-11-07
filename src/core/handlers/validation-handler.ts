import validationRules, {
    ValidationFunction,
    ValidationFunctionSingleArg,
    ValidationFunctionDoubleArg,
    ValidationFunctionMultiArg,
    ValidationFunctionArrayArg
} from '@/core/validation/validation-rules';
import APIService from '@/core/services/api-service';
import ConfigInterface from '@/core/interfaces/ConfigInterface';
import FormDataInterface from '@/core/interfaces/FormDataInterface';

const validationHandler = async (
    formData: FormDataInterface,
    validationErrors: FormDataInterface,
    excludedFields: string[],
    errors: FormDataInterface,
    config: ConfigInterface
): Promise<boolean> => {
    const fieldsToValidate = Object.keys(formData).filter(field => !excludedFields.includes(field));

    for (const field of fieldsToValidate) {
        const value = formData[field];
        const fieldErrors = await validateField(field, value, validationErrors, formData, config);
        errors[field] = fieldErrors || '';
    }
    return !Object.values(errors).some(error => error !== '');
};

const validateField = async (
    field: string,
    value: string,
    validationErrors: { [k: string]: string },
    formData: FormDataInterface,
    config: ConfigInterface
): Promise<string> => {
    const rules = validationErrors[field].split('|');
    let externalData: FormDataInterface[] | undefined;

    for (const rule of rules) {
        const [ruleName, ruleValue] = rule.split(':');
        const validationFunction = validationRules[ruleName];

        if (!validationFunction) continue;

        if ((ruleName === 'unique' || ruleName === 'mismatch') && !externalData) {
            const response = await APIService.getAll(config?.API as string);
            externalData = response.data;
        }

        const errorMessage = await applyValidationRule(
            ruleName,
            value,
            ruleValue,
            validationFunction,
            field,
            formData,
            externalData
        );

        if (errorMessage) return errorMessage;
    }
    return '';
};

const applyValidationRule = async (
    ruleName: string,
    value: string,
    ruleValue: string | undefined,
    validationFunction: ValidationFunction,
    field: string,
    formData: FormDataInterface,
    externalData?: FormDataInterface[]
): Promise<string> => {
    switch (ruleName) {
        case 'unique': {
            const arrayToCheck = externalData ? externalData.map(item => item[field]) : [];
            return (validationFunction as ValidationFunctionArrayArg)(value, arrayToCheck);
        }
        case 'mismatch': {
            const matchingUser = externalData ? externalData.find(item => item.email === formData.email) : undefined;
            return matchingUser
                ? (validationFunction as ValidationFunctionMultiArg)(value, matchingUser.password)
                : 'mismatch';
        }
        case 'confirmPassword':
            return (validationFunction as ValidationFunctionMultiArg)(value, formData.password);
        default: {
            const param = ruleValue ? parseInt(ruleValue, 10) : undefined;
            return param !== undefined
                ? (validationFunction as ValidationFunctionDoubleArg)(value, param)
                : (validationFunction as ValidationFunctionSingleArg)(value);
        }
    }
};

export default validationHandler;
