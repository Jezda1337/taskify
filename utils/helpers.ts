import { FormControls } from "types/shared/form-controls.type";
import { Validator } from "types/shared/validator.type";
import { Validity } from "types/shared/validity.type";
import { InputValue } from "types/shared/input-value.type";
import { FormBody } from "types/shared/form-body.type";

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

export const createBody = (inputs: FormControls) => {
  const body = {} as FormBody;
  for (let key in inputs) {
    body[key] = inputs[key].value;
  }

  return body;
};

export const isActive = (linkPath: string, currentUrl: string, exact?: boolean): boolean => {
  const isExact = (currentUrl === linkPath && linkPath.length > 1) || (currentUrl === "/" && currentUrl === linkPath);
  const startsWith = (currentUrl.startsWith(linkPath) && linkPath.length > 1) || (currentUrl === "/" && currentUrl === linkPath);

  return exact ? isExact : startsWith;
}
