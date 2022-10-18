import { FormControls } from "types/auth/form-controls.type";
import { Validator } from "types/auth/validator.type";
import { Validity } from "types/auth/validity.type";
import { InputValue } from "types/shared/input-value.type";

export const checkValidity = (
  value: InputValue,
  validators: Validator[],
  formState: FormControls
): Validity => {
  const validField = { isValid: true, message: "", };
  const invalidField = validators
    .map((validator) => validator(value, formState))
    .find((field) => !field.isValid);

  return invalidField || validField;
};
