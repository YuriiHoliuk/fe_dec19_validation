export const url = (name, value) => {
  // eslint-disable-next-line max-len
  const URL_REGEXP = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  return URL_REGEXP.test(value)
    ? null
    : `Field ${name} should be a valid URL`;
};

export const minLength = (length) => {
  return (name, value) => {
    if (!value) {
      return null;
    }

    return value.length >= length
      ? null
      : `Field ${name} has length ${value.length}
      but length should be at least ${length}`;
  };
};

export const required = (name, value) => {
  const isValid = Boolean(value.trim());

  if (isValid) {
    return null;
  }

  return `Field ${name} is required`;
};
