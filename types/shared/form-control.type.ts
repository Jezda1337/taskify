import { InputValue } from "types/shared/input-value.type";
import { Validator } from "./validator.type";

export type FormControl = {
  elementType: string;
  type?: string;
  label: string;
  placeholder?: string;
  value: InputValue;
  validators: Validator[];
  required: boolean;
  valid: boolean;
  blurred?: boolean;
  validationErrorMessage?: string;
  touched: boolean;
}