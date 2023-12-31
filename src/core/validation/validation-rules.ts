export type ValidationFunctionSingleArg = (value: string) => string;
export type ValidationFunctionDoubleArg = (value: string, param: number) => string;
export type ValidationFunctionMultiArg = (value: string, ...params: string[]) => string;
export type ValidationFunctionArrayArg = (value: string, array: string[]) => string;

export type ValidationFunction = ValidationFunctionSingleArg | ValidationFunctionDoubleArg | ValidationFunctionMultiArg | ValidationFunctionArrayArg;

const validationRules: Record<string, ValidationFunction> = {
    password: (value: string): string => (!/\p{L}/gu.test(value) || !/\d/.test(value)) ? 'password' : '',
    confirmPassword: (value: string, originalPassword: string): string => (value !== originalPassword) ? 'confirmPassword' : '',
    unique: (value: string, array: string[]): string => (array.includes(value)) ? 'unique' : '',
    mismatch: (value: string, expectedValue: string): string => (value !== expectedValue) ? 'mismatch' : '',
    required: (value: string): string => (value == null || value === '') ? 'required' : '',
    email: (value: string): string => (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) ? 'email' : '',
    alpha: (value: string): string => (!/^\p{L}+$/gu.test(value)) ? 'alpha' : '',
    min: (value: string, min: number): string  => (value.length < min) ? `min:${min}` : '',
    max: (value: string, max: number): string => (value.length > max) ? `max:${max}` : '',
};

export default validationRules;
