import { useCallback, useState } from "react";
import { checkValidity } from "utils/helpers";
import cloneDeep from 'lodash.clonedeep';
import { FormControls } from "types/auth/form-controls.type";
import { FormControl } from "types/auth/form-control.type";
import { InputValue } from "types/shared/input-value.type";

export default function (initialInputs: FormControls) {
  const [inputs, setInputs] = useState(initialInputs);
  const [formIsValid, setFormIsValid] = useState(false);

  const inputHandler = useCallback(
    (
      value: InputValue,
      currentInputKey: keyof FormControls,
      blurred?: boolean
    ) => {
      // Update input value
      const allInputs = cloneDeep(inputs);
      const currentInput = allInputs[currentInputKey];
      currentInput.value = value;
      currentInput.touched = true;
      if (blurred) {
        currentInput.blurred = true;
      }
      allInputs[currentInputKey] = currentInput;

      // Validate all fields
      let isFormValid = true;
      Object.values(allInputs).forEach((input: FormControl) => {
        if (input.validators?.length) {
          const validity = checkValidity(input.value, input.validators, allInputs);
          input.valid = validity.isValid;
          input.validationErrorMessage = validity.message;
        }
        isFormValid = input.valid && isFormValid;
      });

      // Set new state
      setInputs(allInputs);
      setFormIsValid(isFormValid);
    },
    [inputs]
  );

  return { inputs, setInputs: inputHandler, formIsValid };
}
