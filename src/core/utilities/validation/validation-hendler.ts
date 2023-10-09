import { validationRules } from '@/core/utilities/validation/validation-rules';

export const validateField = (value: string, rules: string[]): string[] => {
    const errors: string[] = [];

    for (const rule of rules) {
        if (rule in validationRules) {
            if (!validationRules[rule as keyof typeof validationRules](value)) {
                errors.push(rule);
            }
        }
    }

    return errors;
};