type TranslationFunction = (key: string, params?: Record<string, unknown>) => string;
type TranslationExistFunction = (key: string) => boolean;

export const placeholderAttribute = (inputName: string, t: TranslationFunction, te: TranslationExistFunction): string => {
    const getTranslation = (type: string): string => {
        const key = `${type}.${inputName}`;
        return te(key) ? t(key) : '';
    };

    const placeholder: string = getTranslation('placeholders');
    const label: string = getTranslation('labels');

    return placeholder !== '' ? placeholder : label;
};

export const errorMessage = (inputName: string, error: string, t: TranslationFunction): string => {
    if (error) {
        if (!error.includes(':')) {
            return t(`errors.${error}`, { inputName: t(`labels.${inputName}`) });
        } else {
            const [errorType, errorValue] = error.split(':');
            return t(`errors.${errorType}`, { inputName: t(`labels.${inputName}`), value: errorValue });
        }
    }
    return '';
};
