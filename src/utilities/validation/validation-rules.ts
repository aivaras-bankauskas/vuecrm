export const validationRules = {
    'required': (value: string): boolean => value.trim() !== '',
    'email': (value: string): boolean => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
};