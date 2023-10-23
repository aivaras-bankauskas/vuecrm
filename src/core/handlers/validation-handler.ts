import validationRules, {
    ValidationFunctionSingleArg,
    ValidationFunctionDoubleArg,
    ValidationFunctionMultiArg
} from '@/core/utilities/validation/validation-rules';

const validateFormData = (
    formData: Record<string, string>,
    validationErrors: Record<string, string>,
    excludedFields: string[],
    errors: Record<string, string>
): boolean => {
    let isValid = true;

    for (const field of Object.keys(formData)) {
        if (excludedFields.includes(field)) continue;

        let fieldErrors = '';

        if (field === 'confirmPassword' && formData.hasOwnProperty.call(formData, 'password')) {
            fieldErrors = validationHandler(field, formData[field], validationErrors, formData['password']);
        } else {
            fieldErrors = validationHandler(field, formData[field], validationErrors);
        }

        if (fieldErrors) {
            isValid = false;
        }
        errors[field] = fieldErrors;
    }

    return isValid;
};

const validationHandler = (field: string, value: string, validationErrors: { [k: string]: string; }, originalPassword?: string): string => {
    const rules = validationErrors[field].split('|');
    let errorMessage: string = '';

    for (const rule of rules) {
        const [ruleName, ruleValue] = rule.split(':');
        const validationFunction = validationRules[ruleName];

        if (validationFunction) {
            if (field === 'confirmPassword' && ruleName === 'confirmPassword') {
                errorMessage = (validationFunction as ValidationFunctionMultiArg)(value, originalPassword);
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
