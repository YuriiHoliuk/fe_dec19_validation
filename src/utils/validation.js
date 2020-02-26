export function validateField(fieldConfig, fieldValue) {
  const { name, validators } = fieldConfig;

  if (!validators) {
    return null;
  }

  return validators.reduce((error, validator) => {
    if (error) {
      return error;
    }

    return validator(name, fieldValue);
  }, null);
}

export function getHasError(errors) {
  return Object.values(errors).some(Boolean);
}

export function makeValidate(fieldsConfig, initialErrors) {
  return function validate(values) {
    const errors = fieldsConfig
      .reduce((acc, fieldConfig) => {
        const { name } = fieldConfig;
        const fieldError = validateField(fieldConfig, values[name]);

        return {
          ...acc,
          [name]: fieldError,
        };
      }, { ...initialErrors });

    return {
      errors,
      hasError: getHasError(errors),
    };
  };
}
