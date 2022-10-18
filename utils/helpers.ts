export const checkValidity = (value: any, validators: any, formState: any): any => {
  const validField = { isValid: true, message: "" };
  const invalidField = validators
    .map((validator: any) => validator(value, formState))
    .find((field: any) => !field.isValid);

  return invalidField || validField;
};
