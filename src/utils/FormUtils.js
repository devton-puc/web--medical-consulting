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

export const validateFormData = (formData, formElement) => {
    let errors = [];  
    if (!formElement) return errors;
    const requiredFields = formElement.querySelectorAll("[required]");  
    requiredFields.forEach((input) => {
      const path = input.name.split(".");
      const getNestedValue = (obj, keys) => keys.reduce((acc, key) => (acc && acc[key] ? acc[key] : ""), obj);
      const value = getNestedValue(formData, path);
      if (value === "") {
        errors.push(input.name);;
      }
    });  
    return errors;
  };
  
  export default validateFormData;
  