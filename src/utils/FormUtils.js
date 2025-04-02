export const updateFormData = (event, setFormData) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

export const updateFormDataParent = (event, setFormData, onEmptyFieldAction = null, targetField = null) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
        const keys = name.split('.');
        const updateNestedData = (data, keys) => {
            const [currentKey, ...remainingKeys] = keys;
            if (remainingKeys.length === 0) {
                if (currentKey === targetField && !value && onEmptyFieldAction) {
                    onEmptyFieldAction();
                }
                return {...data, [currentKey]: value };
            }
            return {...data, [currentKey]: updateNestedData(data[currentKey] || {}, remainingKeys) };
        };
        return updateNestedData({ ...prevData }, keys);
    });
};

export const validateFormData = (formData, requiredFields) => {
    const validateFields = (data, keys) => {
        return keys.every((key) => {
            const value = key.split('.').reduce((acc, k) => acc?.[k], data);
            return value !== undefined && value !== null && value !== '';
        });
    };

    return validateFields(formData, requiredFields);
};