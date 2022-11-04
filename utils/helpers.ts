import { FormControls } from "types/auth/form-controls.type";
import { Validator } from "types/auth/validator.type";
import { Validity } from "types/auth/validity.type";
import { InputValue } from "types/shared/input-value.type";

export const checkValidity = (
  value: InputValue,
  validators: Validator[],
  formState: FormControls
): Validity => {
  const validField = { isValid: true, message: "" };
  const invalidField = validators
    .map((validator) => validator(value, formState))
    .find((field) => !field.isValid);

  return invalidField || validField;
};

export const createBody = (
  inputs: FormControls
): { [key: string]: InputValue } => {
  const body: any = {};
  for (let key in inputs) {
    body[key] = inputs[key].value;
  }

  return body as { [key: string]: InputValue };
};

export const isActive = (linkPath: string, currentUrl: string, exact?: boolean): boolean => {
  const isExact = (currentUrl === linkPath && linkPath.length > 1) || (currentUrl === "/" && currentUrl === linkPath);
  const startsWith = (currentUrl.startsWith(linkPath) && linkPath.length > 1) || (currentUrl === "/" && currentUrl === linkPath);

  return exact ? isExact : startsWith;
}
