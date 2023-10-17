import validationRules, { ValidationFunctionSingleArg, ValidationFunctionDoubleArg } from '@/core/utilities/validation/validation-rules';

const validationHandler = (field: string, value: string, validationErrors: { [k: string]: string; }): string => {
    const rules = validationErrors[field].split('|');
    let errorMessage: string = '';

    for (const rule of rules) {
        const [ruleName, ruleValue] = rule.split(':');
        const validationFunction = validationRules[ruleName];

        if (validationFunction) {
            const param = ruleValue ? parseInt(ruleValue) : undefined;

            if (typeof param === 'number') {
                errorMessage = (validationFunction as ValidationFunctionDoubleArg)(value, param);
            } else {
                errorMessage = (validationFunction as ValidationFunctionSingleArg)(value);
            }

            if (errorMessage) {
                break;
            }
        }
    }

    return errorMessage;
};

export default validationHandler;
