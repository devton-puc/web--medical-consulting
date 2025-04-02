export const updateFormData = (event, setFormData) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

export const updateFormDataParent = (event, setFormData) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
        const keys = name.split('.');
        const updateNestedData = (data, keys) => {
            const [currentKey, ...remainingKeys] = keys;

            if (remainingKeys.length === 0) {
                return {
                    ...data,
                    [currentKey]: value
                };
            }
            return {
                ...data,
                [currentKey]: updateNestedData(data[currentKey] || {}, remainingKeys)
            };
        };
        return updateNestedData({ ...prevData }, keys);
    });
};
