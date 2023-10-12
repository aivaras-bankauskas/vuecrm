import validationRules from '@/core/utilities/validation/validation-rules';
type ValidationFunctionSingleArg = (value: string) => string;
type ValidationFunctionDoubleArg = (value: string, minOrMax: number) => string;

const getValue = (inputElement: Element): string => {
    switch (inputElement.tagName) {
        case 'INPUT':
            return (inputElement as HTMLInputElement).value;
        case 'SELECT':
            return (inputElement as HTMLSelectElement).value;
        case 'TEXTAREA':
            return (inputElement as HTMLTextAreaElement).value;
        default:
            return '';
    }
};

const validateFormData = (formElement: Element | null): [boolean, Record<string, string>] => {
    let isValid = true;
    const validationErrors: Record<string, string> = {};

    if (!formElement) return [false, {}];

    const inputElements = formElement.querySelectorAll('[data-rules]');
    inputElements.forEach((inputElement: Element) => {
        const field = inputElement.id;
        const rules = inputElement.getAttribute('data-rules')?.split('|') || [];
        const value = getValue(inputElement);

        let error = '';
        for (const rule of rules) {
            if (rule.includes(':')) {
                const [ruleName, param] = rule.split(':');
                if (validationRules[ruleName as keyof typeof validationRules]) {
                    error = (validationRules[ruleName] as ValidationFunctionDoubleArg)(value, parseInt(param));
                    if (error) {
                        break;
                    }
                }
            } else {
                if (validationRules[rule as keyof typeof validationRules]) {
                    error = (validationRules[rule] as ValidationFunctionSingleArg)(value);
                    if (error) {
                        break;
                    }
                }
            }
        }

        validationErrors[field] = error;
        if (error) {
            isValid = false;
        }
    });

    return [isValid, validationErrors];
};

export default { validateFormData };
