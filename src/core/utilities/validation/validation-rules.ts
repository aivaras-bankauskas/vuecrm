const validationRules = {
    required: (value: string): string => (value == null || value === '') ? 'required' : '',
    email: (value: string): string => (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) ? 'email' : '',
    alpha: (value: string): string => (!/^[a-zA-Z]+$/.test(value)) ? 'alpha' : '',
};

export default validationRules;
