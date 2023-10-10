import validationRules from '@/core/utilities/validation/validation-rules';

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
            if (validationRules[rule as keyof typeof validationRules]) {
                error = validationRules[rule as keyof typeof validationRules](value);
                if (error) {
                    break;
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
