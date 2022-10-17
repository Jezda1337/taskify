export const checkValidity = (value: any, validators: any): any => {
  let isValid = true;
  validators.every((validator: any) => {
    isValid = validator(value);
    if (!isValid) return false;
  });
  return isValid;
};
